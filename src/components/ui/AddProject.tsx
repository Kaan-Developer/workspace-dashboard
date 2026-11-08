import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { enSite } from "@/data/enSite";
import { LuFolderPlus, LuLink, LuX } from "react-icons/lu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AddProjectProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const AddProject = ({ open, onOpenChange }: AddProjectProps) => {
  const { form, statuses, addProject } = enSite.projects;
  const fieldClass =
    "border-border bg-background text-foreground dark:bg-background";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        showCloseButton={false}
        className="gap-0 border-border bg-card text-card-foreground data-[side=right]:h-dvh data-[side=right]:w-full data-[side=right]:sm:max-w-md"
      >
        <SheetHeader className="shrink-0 flex-row items-center gap-3 border-b border-border p-6 pr-16">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
            <LuFolderPlus className="size-5 text-primary" aria-hidden="true" />
          </div>
          <div className="flex min-w-0 flex-col gap-1 text-left">
            <SheetTitle className="text-xl">{form.title}</SheetTitle>
            <SheetDescription>{form.description}</SheetDescription>
          </div>
        </SheetHeader>
        <SheetClose asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute right-5 top-5"
            aria-label={enSite.common.close}
          >
            <LuX aria-hidden="true" />
          </Button>
        </SheetClose>

        <div className="grid min-h-0 flex-1 auto-rows-min gap-6 overflow-y-auto p-6">
          <div className="grid gap-2">
            <Label htmlFor="project-name">{form.name}</Label>
            <Input
              className={`${fieldClass} h-10`}
              id="project-name"
              name="name"
              placeholder={form.namePlaceholder}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="project-description">{form.descriptionLabel}</Label>
              <span className="text-xs text-muted-foreground">{form.optional}</span>
            </div>
            <Textarea
              className={`${fieldClass} min-h-28 resize-y`}
              id="project-description"
              name="description"
              rows={4}
              placeholder={form.descriptionPlaceholder}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="project-status">{form.status}</Label>
            <Select name="status" defaultValue="inProgress">
              <SelectTrigger
                id="project-status"
                className={`${fieldClass} w-full data-[size=default]:h-10`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" align="start">
                <SelectGroup>
                  {Object.entries(statuses).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2 border-t border-border pt-6">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="project-repository">{form.repository}</Label>
              <span className="text-xs text-muted-foreground">{form.optional}</span>
            </div>
            <div className="relative">
              <LuLink
                className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                className={`${fieldClass} h-10 pl-9`}
                id="project-repository"
                name="repository"
                type="url"
                autoCapitalize="none"
                spellCheck={false}
                placeholder={form.repositoryPlaceholder}
                aria-describedby="project-repository-hint"
              />
            </div>
            <p id="project-repository-hint" className="text-xs leading-5 text-muted-foreground">
              {form.repositoryHint}
            </p>
          </div>
        </div>
        <SheetFooter className="shrink-0 gap-3 border-t border-border p-6">
          <p id="project-preview-note" className="text-xs text-muted-foreground">
            {form.previewNote}
          </p>
          <div className="flex gap-3">
            <SheetClose asChild>
              <Button type="button" variant="outline" className="h-10 flex-1">
                {form.cancel}
              </Button>
            </SheetClose>
            <Button type="button" className="h-10 flex-1" disabled aria-describedby="project-preview-note">
              {addProject}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddProject;
