import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from './theme-provider'

export default function Dashboard() {
  const { setTheme } = useTheme()
  const [tasks, setTasks] = useState<string[]>([])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask.trim()])
      setNewTask('')
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={() => setTheme("light")}>
              <SunIcon className="h-[1.2rem] w-[1.2rem]" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setTheme("dark")}>
              <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Total Tasks</CardTitle>
                  <CardDescription>Number of tasks in your list</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{tasks.length}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Task List</CardTitle>
                <CardDescription>Manage your tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="New task..."
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                    />
                    <Button onClick={addTask}>Add Task</Button>
                  </div>
                  <ul className="space-y-2">
                    {tasks.map((task, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Label>{task}</Label>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}