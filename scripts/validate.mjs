// Offline document/package checks only. No network, agent execution or file writes.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const issues=[];
const check=(ok,msg)=>{if(!ok)issues.push(msg);};
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
 if(e.name==='.git')return [];
 const p=path.join(dir,e.name);
 if(e.isSymbolicLink()){issues.push('Symlink: '+path.relative(root,p));return [];}
 return e.isDirectory()?walk(p):[p];
});
const files=walk(root);
const sha256=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const blob=bytes=>crypto.createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
const manifest=[];
let checkedLinks=0,checkedAnchors=0;
const inside=p=>{const r=path.relative(root,p);return !r.startsWith('..')&&!path.isAbsolute(r);};
const slug=s=>s.toLowerCase().replace(/[^\p{L}\p{N}_\s-]/gu,'').replace(/\s/g,'-');
const headings=body=>{
 const seen=new Map();return body.split('\n').filter(l=>/^#{1,6} /.test(l)).map(l=>{
  const base=slug(l.replace(/^#{1,6} /,'').trim());const n=seen.get(base)||0;seen.set(base,n+1);return n?`${base}-${n}`:base;
 });
};
const secretPatterns=[
 /\b[A-Za-z]:[\\/]|\\\\[A-Za-z0-9_.-]+\\|\/Users\/|\/home\/|skill:\/\//,
 /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i,
 /-----BEGIN [A-Z ]*PRIVATE KEY-----|\bgh[pousr]_[A-Za-z0-9_]{15,}|\bgithub_pat_[A-Za-z0-9_]+|\bsk-[A-Za-z0-9]{16,}|\bAKIA[A-Z0-9]{16}\b/
];
for(const f of files){
 const rel=path.relative(root,f).replaceAll('\\','/');const bytes=fs.readFileSync(f);const body=bytes.toString('utf8');
 check(['.md','.json','.txt','.mjs'].includes(path.extname(f)),'Unexpected file type: '+rel);
 check(body.trim().length>0&&!body.includes('\uFFFD'),'Empty or invalid UTF-8: '+rel);
 check(!secretPatterns.some(p=>p.test(body)),'Possible private path/email/credential: '+rel);
 if(f.endsWith('.md'))for(const m of body.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)){
  const target=m[1];if(/^https?:\/\//.test(target)){
   check(/^https:\/\/github\.com\/(?:coreyhaines31\/marketingskills|blader\/humanizer)\/blob\/[a-f0-9]{40}\//.test(target)||/^https:\/\/github\.com\/HuiyangElsaXie\/(?:social-media-post-writer-skill|website-blog-writer-enzh-skill|rednote-writer-skill)(?:\/)?$/.test(target),'Unpinned or unexpected source URL: '+rel);continue;
  }
  const [filePart,anchor]=target.split('#');const resolved=path.resolve(path.dirname(f),filePart||path.basename(f));
  checkedLinks++;check(inside(resolved),'Link escapes package: '+rel);check(fs.existsSync(resolved),'Missing target: '+rel+' -> '+target);
  if(anchor&&fs.existsSync(resolved)){checkedAnchors++;check(headings(fs.readFileSync(resolved,'utf8')).includes(anchor),'Missing anchor: '+rel+' -> '+target);}
 }
 manifest.push({file:rel,bytes:bytes.length,sha256:sha256(bytes),blob:blob(bytes)});
}
for(const name of ['social-media-post-writer']){
 const f=path.join(root,'skills',name,'SKILL.md');check(fs.existsSync(f),'Missing skill: '+name);if(!fs.existsSync(f))continue;
 const text=fs.readFileSync(f,'utf8');const m=text.match(/^---\n([\s\S]+?)\n---\n/);check(Boolean(m),'Missing frontmatter: '+name);if(!m)continue;
 const fields={};for(const line of m[1].split('\n')){const p=line.match(/^([a-z-]+): (.+)$/);if(!p){issues.push('Unsupported scalar frontmatter: '+name);continue;}check(!Object.hasOwn(fields,p[1]),'Duplicate frontmatter field');try{fields[p[1]]=p[2].startsWith('"')?JSON.parse(p[2]):p[2];}catch{issues.push('Invalid scalar: '+name);}}
 check(fields.name===name&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)&&name.length<=64,'Bad skill name: '+name);
 check(Object.keys(fields).sort().join(',')==='description,name','Unexpected frontmatter keys: '+name);
 check(typeof fields.description==='string'&&fields.description.length>0&&fields.description.length<=1024&&!/[<>]/.test(fields.description),'Bad description: '+name);
 check(!/^\s*\[TODO:.*\]\s*$/m.test(text),'Unfinished scaffold: '+name);
}
const generalDir=path.join(root,'skills','social-media-post-writer');
for(const f of walk(generalDir))check(!/linkedin/i.test(fs.readFileSync(f,'utf8')),'Separate platform leaked into general skill: '+path.relative(root,f));
const entry=fs.readFileSync(path.join(generalDir,'SKILL.md'),'utf8');
const routes=[...entry.matchAll(/^\| ([^|]+) \|/gm)].map(m=>m[1].trim()).filter(s=>s!=='Platform');
const expected=['Instagram','TikTok','X','Facebook','Reddit','小红书 / Xiaohongshu','微信公众号 / WeChat Official Accounts','知乎 / Zhihu'];
check(JSON.stringify(routes)===JSON.stringify(expected),'General routing must contain exactly the requested eight platforms');
const sources=JSON.parse(fs.readFileSync(path.join(root,'third-party','sources.json'),'utf8')).sources;
check(sources.length===2,'Unexpected source count');
const expectedRepos=['coreyhaines31/marketingskills','blader/humanizer'];
for(const source of sources){
 check(expectedRepos.includes(source.repository)&&/^[a-f0-9]{40}$/.test(source.commit)&&/^[a-f0-9]{40}$/.test(source.sourceBlob),'Unpinned source');
 check(source.license==='MIT'&&source.noAdditionalNoticeFound===true,'License inspection metadata missing');
 const licensePath=path.join(root,source.licenseCopy);check(inside(licensePath)&&fs.existsSync(licensePath),'Missing license copy');
 if(fs.existsSync(licensePath))check(blob(fs.readFileSync(licensePath))===source.licenseBlob,'License copy changed: '+source.repository);
 for(const target of source.adaptations)check(fs.existsSync(path.join(root,target)),'Missing attributed adaptation: '+target);
}
check(!fs.existsSync(path.join(root,'LICENSE')),'Unexpected new overall license');
for(const example of ['examples/general-eight-platforms.md']){
 const body=fs.readFileSync(path.join(root,example),'utf8');check(/fictional|invented/i.test(body),'Unlabeled example');
}
const report={status:issues.length?'FAIL':'PASS',fileCount:files.length,skillCount:1,generalPlatformCount:routes.length,checkedLinks,checkedAnchors,licenseCopiesChecked:sources.length,issues,manifest};
console.log(process.argv.includes('--json')?JSON.stringify(report,null,2):JSON.stringify({...report,manifest:undefined},null,2));
process.exitCode=issues.length?1:0;
