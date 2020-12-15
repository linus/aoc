process.stdin.on('data', (chunk) => {
  const passports = chunk.toString()
    .split('\n\n')
    .map(s => s.split(/\s+/).map(s => s.split(':')))
    .map(Object.fromEntries);

  console.log(passports.filter(validateHarder).length);
});

function validate (passport) {
  return (
    passport.byr &&
    passport.iyr &&
    passport.eyr &&
    passport.hgt &&
    passport.hcl &&
    passport.ecl &&
    passport.pid
  );
}

function validateHarder (passport) {
  for (const prop in validators) {
    if (!(passport[prop] && validators[prop](passport[prop]))) return false;
  }

  return true;
}

const validators = {
  byr: (v) => { const n = parseInt(v, 10); return n >= 1920 && n <= 2002 },
  iyr: (v) => { const n = parseInt(v, 10); return n >= 2010 && n <= 2020 },
  eyr: (v) => { const n = parseInt(v, 10); return n >= 2020 && n <= 2030 },
  hgt: (v) => {
    const match = v.match(/(\d+)(in|cm)/);
    if (!match) return false;
    const [height, unit] = match.slice(1, 3);
    return (unit === 'cm' && height >= 150 && height <= 193)
        || (unit === 'in' && height >= 59 && height <= 76);
  },
  hcl: (v) => v.match(/^#[a-z0-9]{6}$/),
  ecl: (v) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v),
  pid: (v) => v.match(/^\d{9}$/)
};
