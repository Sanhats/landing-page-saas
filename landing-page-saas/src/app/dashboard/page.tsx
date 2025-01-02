import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileEdit, Eye, ArrowUpRight } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-[#EAD8B1]">
        Dashboard
      </h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-[#3A6D8C]/20 bg-[#001F3F]/40 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#EAD8B1]">
              Total Pages
            </CardTitle>
            <FileEdit className="h-4 w-4 text-[#6A9AB0]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#EAD8B1]">12</div>
            <p className="text-xs text-[#6A9AB0]">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card className="border-[#3A6D8C]/20 bg-[#001F3F]/40 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#EAD8B1]">
              Total Views
            </CardTitle>
            <Eye className="h-4 w-4 text-[#6A9AB0]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#EAD8B1]">1,234</div>
            <p className="text-xs text-[#6A9AB0]">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="border-[#3A6D8C]/20 bg-[#001F3F]/40 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#EAD8B1]">
              Conversion Rate
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-[#6A9AB0]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#EAD8B1]">2.4%</div>
            <p className="text-xs text-[#6A9AB0]">
              +0.3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4 border-[#3A6D8C]/20 bg-[#001F3F]/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-[#EAD8B1]">Recent Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                {
                  title: "Landing Page 1",
                  views: 123,
                  conversion: "2.3%",
                },
                {
                  title: "Landing Page 2",
                  views: 456,
                  conversion: "3.1%",
                },
                {
                  title: "Landing Page 3",
                  views: 789,
                  conversion: "1.8%",
                },
              ].map((page, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-[#EAD8B1]">
                      {page.title}
                    </p>
                    <p className="text-sm text-[#6A9AB0]">
                      {page.views} views
                    </p>
                  </div>
                  <div className="text-sm font-medium text-[#EAD8B1]">
                    {page.conversion}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 border-[#3A6D8C]/20 bg-[#001F3F]/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-[#EAD8B1]">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                {
                  action: "Created new page",
                  time: "2 hours ago",
                },
                {
                  action: "Updated Landing Page 2",
                  time: "4 hours ago",
                },
                {
                  action: "Published Landing Page 1",
                  time: "1 day ago",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between"
                >
                  <p className="text-sm text-[#EAD8B1]">
                    {activity.action}
                  </p>
                  <p className="text-sm text-[#6A9AB0]">
                    {activity.time}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

