export interface columnModel {
    label: string,
    dataKey?: string | number,
    width?: number,
    flexGrow?: number,
    align?: string,
    cell: any,
    sortable?: boolean
}
