import { Button } from '@/shared/shadcn/ui/button'
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/shared/shadcn/ui/dialog'
import { Input } from '@/shared/shadcn/ui/input'
import { Label } from '@/shared/shadcn/ui/label'

interface Props {
   isDialogOpen: boolean
   setIsDialogOpen: (isDialogOpen: boolean) => void
   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
   title: string
   description: string
}
export default function CommentDialog({
   isDialogOpen,
   setIsDialogOpen,
   handleSubmit,
   title,
   description,
}: Props) {
   return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
         <form
            onSubmit={() => {
               console.log('하이')
            }}
         >
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>{title}</DialogTitle>
                  <DialogDescription>
                     <p>{description}</p>
                  </DialogDescription>
               </DialogHeader>

               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                     Password
                  </Label>
                  <Input id="password" className="col-span-3" type="password" />
               </div>
               <DialogFooter>
                  <Button
                     variant="outline"
                     onClick={() => setIsDialogOpen(false)}
                  >
                     취소
                  </Button>
                  <Button type="submit">확인</Button>
               </DialogFooter>
            </DialogContent>
         </form>
      </Dialog>
   )
}
