import HostEditFormProfile from "@/components/edit/HostEditFormProfile";
import HostEditFormProperty from "@/components/edit/HostEditFormProperty";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function AdminHostEditPage() {
  return (
    <main className="mt-8 flex min-h-screen flex-col items-center justify-center py-4">
      <div className="mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Host Editing Page
        </h2>
      </div>
      <Tabs defaultValue="profile_edit_form" className="mt-4">
        <TabsList className="flex max-w-4xl justify-center">
          <TabsTrigger value="profile_edit_form" className="flex-1">
            Profile
          </TabsTrigger>
          <TabsTrigger value="properties_edit_form" className="flex-1">
            Properties
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile_edit_form">
          <div className="flex justify-center">
            <div>
              <HostEditFormProfile />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="properties_edit_form">
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <HostEditFormProperty />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
