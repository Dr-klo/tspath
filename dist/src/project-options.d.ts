import { ISettings } from "./type-definitions";
export declare class ProjectOptions {
    outDir: string;
    baseUrl: string;
    rootDirs: string[];
    pathMappings: ISettings;
    processMappings(mappings: any): void;
    constructor(tsconfigObj: any);
}
