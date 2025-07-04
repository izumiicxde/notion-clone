"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader
} from "@/components/ui/dialog"
import { useSettings } from "@/hooks/useSettings"
import { Label } from "@/components/ui/label"
import { ModeToggle } from "@/components/ModeToggle"
import { siteConfig } from "@/lib/shared"


const SettingsModal = () => {
    const settings = useSettings()
    return (
        <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
            <DialogContent>
                <DialogHeader className="border-b pb-3 ">
                    <h2 className="text-lg font-semibold">My Settings</h2>
                </DialogHeader>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1 ">
                        <Label>
                            Appearance
                        </Label>
                        <span className="text-[0.8rem] text-muted-foreground">
                            Customize how {siteConfig?.name} looks on ur device
                        </span>
                    </div>
                    <ModeToggle />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SettingsModal