type Ttype = '과일' | '채소'

const groupData = (param: any[], type: Ttype) => {
   if (param instanceof Array) {
      const groped = Object.groupBy(param, (item) => item.type)
      console.log(param)
      console.log(groped)
   }
}

const inventory = [
   { name: '사과', type: '과일' },
   { name: '바나나', type: '과일' },
   { name: '당근', type: '채소' },
]

groupData(inventory, '과일')
