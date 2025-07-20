'use client'

import { Button } from '@/shared/shadcn/ui/button'
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import { Input } from '@/shared/shadcn/ui/input'
import { Label } from '@/shared/shadcn/ui/label'

export default function Settings() {
   return (
      <div className="space-y-6">
         <h2 className="text-2xl font-bold">설정</h2>

         <Card>
            <CardHeader>
               <CardTitle>프로필 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="nickname">닉네임</Label>
                  <Input id="nickname" placeholder="닉네임을 입력하세요" />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="bio">자기소개</Label>
                  <Input id="bio" placeholder="자기소개를 입력하세요" />
               </div>
               <Button>프로필 업데이트</Button>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle>비밀번호 변경</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="current-password">현재 비밀번호</Label>
                  <Input
                     id="current-password"
                     type="password"
                     autoComplete="current-password"
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="new-password">새 비밀번호</Label>
                  <Input
                     id="new-password"
                     type="password"
                     autoComplete="new-password"
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="confirm-password">새 비밀번호 확인</Label>
                  <Input
                     id="confirm-password"
                     type="password"
                     autoComplete="new-password"
                  />
               </div>
               <Button>비밀번호 변경</Button>
            </CardContent>
         </Card>

         <Card className="border-red-200">
            <CardHeader>
               <CardTitle className="text-red-600">계정 삭제</CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-gray-600 mb-4">
                  계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은
                  되돌릴 수 없습니다.
               </p>
               <Button variant="destructive">계정 삭제</Button>
            </CardContent>
         </Card>
      </div>
   )
}
