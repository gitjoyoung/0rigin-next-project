'use client'

import { Button } from '@/shared/shadcn/ui/button'
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/shadcn/ui/form'
import { Input } from '@/shared/shadcn/ui/input'
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/shadcn/ui/select'
import { LoadingSpinner } from '@/shared/ui/loading-spinner'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { ChangePasswordModal } from './change-password-modal'
import { useProfile } from './hooks/use-profile'

export default function Profile() {
   const { form, profile, isLoading, error, updateProfileMutation, onSubmit } =
      useProfile()
   const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
      useState(false)
   const [isEditing, setIsEditing] = useState(false)

   // 업데이트 성공 시 편집 모드 리셋
   useEffect(() => {
      if (updateProfileMutation.isSuccess) {
         console.log('Profile update successful, resetting edit mode')
         setIsEditing(false)
      }
   }, [updateProfileMutation.isSuccess])

   // 폼 제출 핸들러
   const handleSubmit = (data: any) => {
      console.log('Form submitted with data:', data)
      onSubmit(data)
   }

   if (error) {
      return (
         <div className="flex flex-col items-center justify-center mx-auto">
            <h1 className="text-2xl font-bold">오류가 발생했습니다.</h1>
            <p className="text-sm text-gray-500">{error.message}</p>
         </div>
      )
   }

   if (isLoading) {
      return (
         <div className="flex flex-col items-center justify-center mx-auto">
            <LoadingSpinner />
         </div>
      )
   }

   return (
      <div className="flex flex-col items-center justify-center mx-auto ">
         <Card className="w-full ">
            <CardHeader>
               <div className="flex items-center justify-between sm:flex-row flex-col gap-2 ">
                  <div className="flex justify-start items-center gap-2">
                     <CardTitle className="text-2xl font-bold">
                        Profile
                     </CardTitle>
                     <CardDescription>회원 프로필 정보 수정</CardDescription>
                  </div>
                  <div className="flex gap-2">
                     <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsChangePasswordModalOpen(true)}
                     >
                        비밀번호 변경
                     </Button>
                     <Button
                        type="button"
                        variant={isEditing ? 'default' : 'outline'}
                        onClick={() => setIsEditing(!isEditing)}
                        disabled={updateProfileMutation.isPending}
                     >
                        {isEditing ? '편집 완료' : '편집 하기'}
                     </Button>
                  </div>
               </div>
            </CardHeader>
            <CardContent>
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(handleSubmit)}
                     className="space-y-8"
                  >
                     <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                           <FormField
                              control={form.control}
                              name="nickname"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>닉네임</FormLabel>
                                    <FormControl>
                                       <Input
                                          placeholder="닉네임을 입력하세요"
                                          {...field}
                                          disabled={
                                             !isEditing ||
                                             updateProfileMutation.isPending
                                          }
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>

                        <div className="col-span-2 ">
                           <FormField
                              control={form.control}
                              name="gender"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>성별</FormLabel>
                                    <FormControl>
                                       <Select
                                          onValueChange={(v) =>
                                             v != '' && field.onChange(v)
                                          }
                                          value={field.value}
                                          disabled={
                                             !isEditing ||
                                             updateProfileMutation.isPending
                                          }
                                       >
                                          <SelectTrigger>
                                             <SelectValue placeholder="성별을 선택하세요" />
                                          </SelectTrigger>
                                          <SelectContent>
                                             <SelectGroup className="overflow-y-auto max-h-[10rem]">
                                                <SelectItem value="man">
                                                   남성
                                                </SelectItem>
                                                <SelectItem value="women">
                                                   여성
                                                </SelectItem>
                                                <SelectItem value="etc">
                                                   기타
                                                </SelectItem>
                                             </SelectGroup>
                                          </SelectContent>
                                       </Select>
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>

                        <div className="col-span-2">
                           <FormItem>
                              <FormLabel>이메일</FormLabel>
                              <FormControl>
                                 <Input value={profile?.email} disabled />
                              </FormControl>
                              <FormDescription>
                                 이메일은 변경할 수 없습니다.
                              </FormDescription>
                           </FormItem>
                        </div>

                        <div className="col-span-2">
                           <FormItem>
                              <FormLabel>가입일</FormLabel>
                              <FormControl>
                                 <Input
                                    value={dayjs(profile?.created_at).format(
                                       'YYYY-MM-DD',
                                    )}
                                    disabled
                                 />
                              </FormControl>
                           </FormItem>
                        </div>
                     </div>

                     {isEditing && (
                        <div className="flex justify-end space-x-2">
                           <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsEditing(false)}
                              disabled={updateProfileMutation.isPending}
                           >
                              취소
                           </Button>
                           <Button
                              type="submit"
                              disabled={updateProfileMutation.isPending}
                           >
                              {updateProfileMutation.isPending
                                 ? '저장중...'
                                 : '저장하기'}
                           </Button>
                        </div>
                     )}
                  </form>
               </Form>
            </CardContent>
         </Card>
         <ChangePasswordModal
            open={isChangePasswordModalOpen}
            onOpenChange={setIsChangePasswordModalOpen}
         />
      </div>
   )
}
