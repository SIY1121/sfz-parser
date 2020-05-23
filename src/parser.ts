import { SfzRegion } from "./types";

export default function (sfzText: string): SfzRegion[] {
  sfzText = sfzText.replace(/\/\/.*$/gm, "");
  return matchAll(sfzText, /<(.*?)>\s([\s\S]*?)((?=<)|\Z)/gm).map((res) => {
    const kvs = matchAll(res[2], /(.*?)=(.*?)($|\s(?=.*?=))/gm);
    const prop: any = {};
    kvs.forEach((kv) => {
      prop[kv[1].replace(/\s/gm, "")] = /^\d*$/g.test(kv[2])
        ? Number(kv[2])
        : kv[2];
      if (/^[a-g]#?\d$/.test(kv[2])) prop[kv[1]] = name2num(kv[2]);
    });
    if (prop.sample) prop.sample = prop.sample.replace(/\\/g, "/");

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

function name2num(name: string): number {
  const tmp = name.match(/^([a-g])(#?)(\d)$/);
  if (!tmp) return -1;
  const d = tmp[1];
  const s = tmp[2];
  const o = Number(tmp[3]);
  let res = (o + 1) * 12 + (s === "#" ? 1 : 0);
  switch (d) {
    case "c":
      return res;
    case "d":
      return res + 2;
    case "e":
      return res + 4;
    case "f":
      return res + 5;
    case "g":
      return res + 7;
    case "a":
      return res + 9;
    case "b":
      return res + 11;
    default:
      return -1;
  }
}
