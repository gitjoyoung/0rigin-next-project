const a = {
   name: 1,
   age: 2,
   address: '서울시 금천구',
   array: [1, 2, 3],
}

const b = {
   name: 12,
   age: 3,
   address: '서울시 강남구',
}

const c = Object.assign(a, b)

const d = [1, 2, 3]
const f = [2, 3, 4]

const g = Object.keys(f)

const k = JSON.stringify(a)
console.log(k)

const kk = JSON.parse(k)
console.log(kk.array)
