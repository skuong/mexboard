import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GeneralSettings } from "@/features/preferences/components/general-settings";
import { HotkeysSettings } from "@/features/preferences/components/hotkeys-settings";
import { Cloud, Keyboard, Settings2 } from "lucide-react";
import { SyncCloudConnect } from "@/features/sync/components/sync-cloud-connect";

export function SettingsSheetBody() {
  return (
    <Tabs defaultValue="general" className="px-6 pb-6">
      <TabsList className="w-full mb-3">
        <TabsTrigger value="general" className="cursor-pointer">
          <Settings2 />
        </TabsTrigger>

        <TabsTrigger value="cloud" className="cursor-pointer">
          <Cloud />
        </TabsTrigger>

        <TabsTrigger value="keymap" className="cursor-pointer">
          <Keyboard />
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <GeneralSettings />
      </TabsContent>

      <TabsContent value="cloud">
        <SyncCloudConnect />
      </TabsContent>

      <TabsContent value="keymap">
        <HotkeysSettings />
      </TabsContent>
    </Tabs>
  );
}
