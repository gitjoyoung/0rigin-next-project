'use client'
import React, { useState } from 'react'
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import { Input } from '@/shared/shadcn/ui/input'
import { Button } from '@/shared/shadcn/ui/button'
import { Textarea } from '@/shared/shadcn/ui/textarea'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/shadcn/ui/select'
import { Alert, AlertDescription } from '@/shared/shadcn/ui/alert'
import { AlertCircle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/shadcn/ui/form'
import { useForm } from 'react-hook-form'

const InquiryForm = () => {
   const router = useRouter()
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [isSubmitted, setIsSubmitted] = useState(false)
   const [serverError, setServerError] = useState('')

   const form = useForm({
      defaultValues: {
         title: '',
         email: '',
         category: 'general',
         content: '',
         attachFile: null,
      },
   })

   const handleSubmit = async (data) => {
      setIsSubmitting(true)
      setServerError('')

      try {
         const formData = new FormData()
         formData.append('title', data.title)
         formData.append('email', data.email)
         formData.append('category', data.category)
         formData.append('content', data.content)
         if (data.attachFile) {
            formData.append('file', data.attachFile)
         }

         const response = await fetch('/api/inquiries', {
            method: 'POST',
            body: formData,
         })

         if (!response.ok) {
            throw new Error('서버 에러가 발생했습니다.')
         }

         setIsSubmitted(true)
         form.reset()

         setTimeout(() => {
            setIsSubmitted(false)
         }, 3000)

         router.refresh()
      } catch (error) {
         console.error('Submit error:', error)
         setServerError(
            '문의 제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
         )
      } finally {
         setIsSubmitting(false)
      }
   }

   return (
      <Card className="max-w-2xl mx-auto my-6">
         <CardHeader>
            <CardTitle>1:1 문의하기</CardTitle>
            <CardDescription>
               문의하실 내용을 아래 양식에 맞춰 작성해 주세요.
            </CardDescription>
         </CardHeader>

         <CardContent>
            {isSubmitted && (
               <Alert className="mb-6 bg-green-50">
                  <AlertDescription className="flex items-center gap-2">
                     <AlertCircle className="h-4 w-4" />
                     문의가 성공적으로 제출되었습니다. 답변은 입력하신 이메일로
                     발송됩니다.
                  </AlertDescription>
               </Alert>
            )}

            {serverError && (
               <Alert className="mb-6 bg-red-50">
                  <AlertDescription className="flex items-center gap-2 text-red-600">
                     <AlertCircle className="h-4 w-4" />
                     {serverError}
                  </AlertDescription>
               </Alert>
            )}

            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-6"
               >
                  <FormField
                     control={form.control}
                     name="title"
                     rules={{ required: '제목을 입력해주세요' }}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>제목</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="문의 제목을 입력해주세요"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="email"
                     rules={{
                        required: '이메일을 입력해주세요',
                        pattern: {
                           value: /\S+@\S+\.\S+/,
                           message: '올바른 이메일 형식이 아닙니다',
                        },
                     }}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>이메일</FormLabel>
                           <FormControl>
                              <Input
                                 type="email"
                                 placeholder="답변받으실 이메일을 입력해주세요"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="category"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>문의 유형</FormLabel>
                           <FormControl>
                              <Select
                                 onValueChange={field.onChange}
                                 defaultValue={field.value}
                              >
                                 <SelectTrigger>
                                    <SelectValue placeholder="문의 유형을 선택해주세요" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="general">
                                       일반 문의
                                    </SelectItem>
                                    <SelectItem value="technical">
                                       기술 지원
                                    </SelectItem>
                                    <SelectItem value="billing">
                                       결제 문의
                                    </SelectItem>
                                    <SelectItem value="partnership">
                                       제휴 문의
                                    </SelectItem>
                                 </SelectContent>
                              </Select>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="content"
                     rules={{ required: '문의 내용을 입력해주세요' }}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>문의 내용</FormLabel>
                           <FormControl>
                              <Textarea
                                 placeholder="문의하실 내용을 자세히 입력해주세요"
                                 className="min-h-[150px]"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="attachFile"
                     render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                           <FormLabel>첨부파일</FormLabel>
                           <FormControl>
                              <Input
                                 type="file"
                                 className="cursor-pointer"
                                 accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                                 onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file && file.size > 5 * 1024 * 1024) {
                                       form.setError('attachFile', {
                                          type: 'manual',
                                          message:
                                             '파일 크기는 5MB 이하여야 합니다.',
                                       })
                                       e.target.value = ''
                                       return
                                    }
                                    onChange(file)
                                 }}
                                 {...field}
                              />
                           </FormControl>
                           <p className="text-sm text-gray-500">
                              최대 파일 크기: 5MB (지원 형식: JPG, PNG, PDF,
                              DOC, DOCX)
                           </p>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <Button
                     type="submit"
                     className="w-full"
                     disabled={isSubmitting}
                  >
                     {isSubmitting ? (
                        <>
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                           제출 중...
                        </>
                     ) : (
                        '문의하기'
                     )}
                  </Button>
               </form>
            </Form>
         </CardContent>
      </Card>
   )
}

export default InquiryForm
