import { FestivalHeader } from "@/components/festival-header"
import { FestivalFooter } from "@/components/festival-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <FestivalHeader />

      <main className="container mx-auto px-4 py-8">
        <Skeleton className="h-10 w-24 mb-6" />

        <div className="grid lg:grid-cols-[1fr,400px] gap-8 mb-16">
          <Skeleton className="aspect-[4/3] lg:aspect-[16/10] rounded-lg" />

          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              <div className="pt-6 border-t space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-12 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <FestivalFooter />
    </div>
  )
}
