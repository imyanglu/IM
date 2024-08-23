import { getItemAsync, setItemAsync } from 'expo-secure-store';
import { nanoid } from 'nanoid/non-secure';
import { writeAsStringAsync, EncodingType } from 'expo-file-system';

export const getId = async () => {
  const id = await getItemAsync('id');
  if (id) return id;
  const clientId = nanoid();
  await setItemAsync('id', clientId);
  return clientId;
};
export const base64ToFile = async ({ base64, uri }: { base64: string; uri: string }) => {
  return writeAsStringAsync(uri, base64, {
    encoding: EncodingType.Base64,
  });
};

export const saveImg = (uri: string) => {
  return new Promise((resolve, reject) => {});
};

export const pySegSort = <K extends unknown>(arr: K[], sortKey: (k: K) => string) => {
  if (!String.prototype.localeCompare) return null;
  const isLetter = /^[A-Za-z]/;
  const isChinese = /^[\u4e00-\u9fa5]/;
  let letters = 'ABCDEFGHJKLMNOPQRSTWXYZ#'.split('');
  let zh = '阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀'.split('');
  let segs: {
    letter: string;
    data: K[];
  }[] = [];

  letters.forEach((c, i) => {
    let cur: {
      letter: string;
      data: K[];
    } = { letter: c, data: [] };
    arr.forEach((item) => {
      const firstC = sortKey(item)[0];
      if (isChinese.test(firstC)) {
        if (firstC.localeCompare(zh[i]) >= 0 && firstC.localeCompare(zh[i + 1]) < 0) {
          cur.data.push(item);
        }
        return;
      }
      if (isLetter.test(firstC)) {
        if (firstC.toLocaleUpperCase() === c) cur.data.push(item);
        return;
      }
      cur.data.push(item);
    });
    if (cur.data.length) {
      cur.data.sort(function (n1, n2) {
        const a = sortKey(n1);
        const b = sortKey(n2);
        if (isChinese.test(a[0]) && isChinese.test(b[0])) return a.localeCompare(b, 'zh');
        if (isChinese.test(a[0])) return -1;
        if (isChinese.test(b[0])) return 1;
        return a.localeCompare(b);
      });
      segs.push(cur);
    }
  });

  return segs;
};

export const queryUsers = (ids: string) => {};
