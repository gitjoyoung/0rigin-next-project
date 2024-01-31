import React from 'react'

export default function BoardCreateTipBox() {
   return (
      <div className="h-full  md:block hidden min-w-[250px] border border-black bg-green-100 w-full text-sm p-2">
         <h1 className="text-xl mb-1">TIP : 글쓰기 가이드</h1>
         <ul>
            <li>주제에 집중하면 글이 더욱 명확해집니다.</li>
            <li>간결하고 명확한 문장 사용은 가독성을 향상시킵니다.</li>
            <li>명확한 제목은 글의 내용을 잘 전달하는 첫걸음입니다.</li>
            <li>핵심 정보를 먼저 언급하면 독자의 관심을 끌 수 있습니다.</li>
            <li>목차를 사용하면 긴 글의 구조가 명확해집니다.</li>
            <li>이미지와 그래픽은 글의 이해를 돕고 흥미를 더합니다.</li>
            <li>맞춤법과 문법 검토는 전문성을 높이는 요소입니다.</li>
            <li>
               독자의 관점을 고려하면 글이 더 많은 사람들에게 다가갈 수
               있습니다.
            </li>
         </ul>
      </div>
   )
}
