'use client'

export default function LoadingAnimation() {
   return (
      <div className="min-h-screen flex items-center justify-center bg-background">
         <div className="text-center space-y-6">
            {/* 미니멀 스피너 */}
            <div className="relative">
               <div className="w-8 h-8 border-2 border-muted rounded-full animate-spin border-t-primary mx-auto"></div>
            </div>

            {/* 심플한 텍스트 */}
            <div className="space-y-2">
               <h2 className="text-xl font-medium text-foreground">
                  로그인 중...
               </h2>
               <p className="text-sm text-muted-foreground">
                  잠시만 기다려 주세요
               </p>
            </div>
         </div>
      </div>
   )
}
