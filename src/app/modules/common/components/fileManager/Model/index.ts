import { Dispatch } from "react"

export type ContextMenuProps = {
    xPos: string
    yPos: string
    showMenu: boolean
    setShowMenu: Dispatch<React.SetStateAction<boolean>>
    handleContextMenu: (e: any, isModal: boolean | undefined) => void
}

export type FileProps = {
    basename: string
    type: string
    storageLink: string
    downloadLink: string
    modifiedAt: string,
    size: string,
    writeable: boolean,
    readable: boolean,
    fileExt?: string | undefined
    totalFolder: number,
    totalFile: number
}

export type SubFolderType = {
    basename: string,
    storageLink: string,
    subFolder: Array<{ [key: string]: string | SubFolderType }> | []
}

export type MediaHierarchyType = {
    basename?: string,
    storageLink?: string,
    subFolder?: Array<SubFolderType>
}

export type MediaParams = {
    path: string
}

export type DeleteFolderType = { paths: Array<{ folderPath: string }> }

export type MoveCopyBodyType = {
    oldPath: string
    newPath: string
}
