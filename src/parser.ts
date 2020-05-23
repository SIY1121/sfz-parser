import { SfzRegion } from "./types";

export default function(sfzText: string): SfzRegion[] {
  sfzText = sfzText.replace(/\/\/.*$/gm, "");
  return matchAll(sfzText, /<(.*?)>\s([\s\S]*?)((?=<)|\Z)/gm).map((res) => {
    const kvs = matchAll(res[2], /(.*?)=(.*?)(\s|$)/gm);
    const prop: any = {};
    kvs.forEach((kv) => {
      prop[kv[1].replace(/\s/gm, "")] = isNaN(parseInt(kv[2]))
        ? kv[2]
        : Number(kv[2]);
    });
    return {
      type: res[1],
      property: prop,
    };
  });
}

function matchAll(str: string, regexp: RegExp) {
  let match: RegExpExecArray | null = null;
  const res = [];
  while ((match = regexp.exec(str)) !== null) {
    res.push(match);
  }
  return res;
}
