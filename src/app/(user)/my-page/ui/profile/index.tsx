'use client'

import { Badge } from '@/shared/shadcn/ui/badge'
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
import { LoadingSpinner } from '@/shared/ui/spinner/loading-spinner'
import { useState } from 'react'
import { ChangePasswordModal } from './change-password-modal'
import { useProfile } from './hooks/use-profile'

export default function Profile() {
   const { form, profile, isLoading, error, updateProfileMutation, onSubmit } =
      useProfile()
   const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
      useState(false)
   const [editingField, setEditingField] = useState<string | null>(null)

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
            <h1 className="text-2xl font-bold">로딩중... </h1>
         </div>
      )
   }

   return (
      <div className="flex flex-col items-center justify-center mx-auto ">
         <Card className="w-full ">
            <CardHeader>
               <CardTitle className="text-2xl font-bold">Profile</CardTitle>
               <CardDescription>회원 프로필 정보 수정</CardDescription>
            </CardHeader>
            <CardContent>
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="space-y-8"
                  >
                     <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                           <FormField
                              control={form.control}
                              name="nickname"
                              render={({ field }) => (
                                 <FormItem>
                                    <div className="flex items-center justify-between">
                                       <FormLabel>닉네임</FormLabel>
                                       <Badge
                                          variant="outline"
                                          className="cursor-pointer hover:bg-secondary"
                                          onClick={() =>
                                             setEditingField(
                                                editingField === 'nickname'
                                                   ? null
                                                   : 'nickname',
                                             )
                                          }
                                       >
                                          {editingField === 'nickname'
                                             ? 'Done'
                                             : 'Edit'}
                                       </Badge>
                                    </div>
                                    <FormControl>
                                       <Input
                                          placeholder="닉네임을 입력하세요"
                                          {...field}
                                          disabled={editingField !== 'nickname'}
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
                                    <div className="flex items-center justify-between">
                                       <FormLabel>성별</FormLabel>
                                       <Badge
                                          variant="outline"
                                          className="cursor-pointer hover:bg-secondary"
                                          onClick={() =>
                                             setEditingField(
                                                editingField === 'gender'
                                                   ? null
                                                   : 'gender',
                                             )
                                          }
                                       >
                                          {editingField === 'gender'
                                             ? 'Done'
                                             : 'Edit'}
                                       </Badge>
                                    </div>
                                    <Select
                                       onValueChange={field.onChange}
                                       defaultValue={field.value}
                                       disabled={editingField !== 'gender'}
                                    >
                                       <FormControl>
                                          <SelectTrigger>
                                             <SelectValue placeholder="성별을 선택하세요" />
                                          </SelectTrigger>
                                       </FormControl>
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
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>

                        <div className="col-span-2">
                           <FormItem>
                              <FormLabel>이메일</FormLabel>
                              <FormControl>
                                 <Input value={profile.email} disabled />
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
                                    value={new Date(
                                       profile.created_at,
                                    ).toLocaleString()}
                                    disabled
                                 />
                              </FormControl>
                           </FormItem>
                        </div>
                     </div>

                     <div className="flex justify-end space-x-2">
                        <Button
                           type="button"
                           variant="outline"
                           onClick={() => setIsChangePasswordModalOpen(true)}
                        >
                           비밀번호 변경
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
