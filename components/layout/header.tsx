import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

export default function Header() {
  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                FitCheck.AI
              </h1>
              <p className="text-xs text-gray-600">Upload your fit. Get rated. Get styled.</p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 font-medium"
          >
            Beta
          </Badge>
        </div>
      </div>
    </header>
  )
}
