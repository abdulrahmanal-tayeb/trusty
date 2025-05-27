export interface TemplateItem {
    id: number,
    template: string,
    type: TemplatePurpose,
    verbosity: TemplateVerbosity
}


export type TemplatePurpose = "Work" | "Post" | "Netural" | "Email";
export type TemplateVerbosity = "Short" | "Meduim" | "Long";