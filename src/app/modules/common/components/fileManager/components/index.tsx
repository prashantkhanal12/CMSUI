import {useEffect, useRef, useState} from 'react'
import {Col, Row} from 'react-bootstrap-v5'
import {
  AiFillFolder,
  AiOutlineFolderAdd,
  AiOutlineFilePdf,
  AiOutlineFileText,
  AiFillFolderOpen,
} from 'react-icons/ai'
import {isArray, isEmpty} from 'lodash'
import {toast} from 'react-toastify'
import Badge from 'rsuite/esm/Badge'
import {BiUpload} from 'react-icons/bi'
import {SiMicrosoftexcel} from 'react-icons/si'
import {useDispatch, useSelector} from 'react-redux'
import NProgress from 'nprogress'
import Tree from 'rsuite/Tree'
import {ItemDataType} from 'rsuite/esm/@types/common'

// includes
import AddFolder from './addFolder'
import InfoModal from './infoModal'
import UploadModal from './uploadModal'
import PreviewModal from './previewModal'
import RightClickMenu from './rightClickMenu'
import {ContextMenuProps, FileProps, MediaHierarchyType, MediaParams, SubFolderType} from '../Model'
import * as mediaManager from 'src/app/modules/common/components/fileManager'
import {IMediaManagerState} from 'src/app/modules/common/components/fileManager'
import useContextMenu from 'src/app/modules/common/components/fileManager/helper/contextMenu'
import TopHeaderMenu from './topHeaderMenu'

interface Props {
  isModal?: boolean
  editorCallBack?: any
  handleCloseFileManagerModal?: (() => void) | undefined
}

const FileManager = ({isModal, editorCallBack, handleCloseFileManagerModal}: Props) => {
  const dispatch = useDispatch()
  const treeRef: any = useRef()
  const {
    data,
    mediaHierarchyData,
    addFileData,
    removeFolderFilesData,
    success,
    currentPath,
    loading,
    error,
  }: IMediaManagerState = useSelector((state: any) => state?.mediaManager)
  const {xPos, yPos, showMenu, setShowMenu, handleContextMenu}: ContextMenuProps = useContextMenu()
  const [clickedFiles, setClickedFiles] = useState<Array<string>>([])
  const [selectedFile, setSelectedFile] = useState<FileProps>({
    downloadLink: '',
    basename: '',
    type: '',
    fileExt: '',
    storageLink: '',
    modifiedAt: '',
    size: '',
    writeable: true,
    readable: true,
    totalFolder: 0,
    totalFile: 0,
  })
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [previewModalOpen, setPreviewModalOpen] = useState(false)
  const [uploadFilesOpen, setUploadFilesOpen] = useState(false)
  const [addFolderOpen, setAddFolderOpen] = useState(false)
  const [params, setParams] = useState<MediaParams>({
    path: '',
  })
  const [goBackArray, setGoBackArray] = useState<Array<string>>([])
  const [goForwardArray, setGoForwardArray] = useState<Array<string>>([])
  const [mediaHierarchyTree, setMediaHierarchyTree] = useState([])
  const [selectedTreeFolder, setSelectedTreeFolder] = useState<string>('')
  const [folderTreeExpandValues, setFolderTreeExpandValues] = useState<any>([])
  const [renameFileFolder, setRenameFileFolder] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    NProgress.configure({showSpinner: false})
    NProgress.configure({parent: '#spinner-parent'})
    dispatch(mediaManager.actions.getMediaHierarchy())
  }, [])

  useEffect(() => {
    if (!isEmpty(data)) {
      isEmpty(selectedTreeFolder) && setSelectedTreeFolder(currentPath)
      isEmpty(folderTreeExpandValues) && setFolderTreeExpandValues([currentPath])
    }
  }, [data])

  useEffect(() => {
    if (loading) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  }, [loading])

  useEffect(() => {
    dispatch(mediaManager?.actions?.getMediaList(params))
  }, [params])

  useEffect(() => {
    if (!isEmpty(removeFolderFilesData) && success) {
      setClickedFiles([])
      dispatch(mediaManager.actions.deleteFolderFilesReset())
      dispatch(mediaManager.actions.getMediaList(params))
      setTimeout(() => {
        toast.success('Files Deleted successfully')
      }, 1000)
    }
  }, [removeFolderFilesData, success])

  useEffect(() => {
    if (!isEmpty(mediaHierarchyData)) {
      let mainArray: any = makeTreeNode([mediaHierarchyData])
      setMediaHierarchyTree(mainArray)
    }
  }, [mediaHierarchyData])

  const makeTreeNode = (res: Array<MediaHierarchyType> | Array<SubFolderType>): any =>
    res.map((subRes: MediaHierarchyType | SubFolderType) => {
      return {
        value: subRes?.storageLink,
        label: subRes?.basename,
        ...(isArray(subRes?.subFolder) && {children: makeTreeNode(subRes?.subFolder)}),
      }
    })

  const handleSingleClick = (e: any, filePath: string, from?: string) => {
    if (e.ctrlKey && !from) {
      const oldClickedFiles: Array<string> = [...clickedFiles]
      let newClickFiles: Array<string> = []
      if (oldClickedFiles?.includes(filePath)) {
        newClickFiles = oldClickedFiles.filter((file) => file !== filePath)
      } else {
        newClickFiles = [...clickedFiles, filePath]
      }
      setClickedFiles(newClickFiles)
    } else if (from === 'ContextMenu' && e.ctrlKey) {
    } else {
      setClickedFiles([filePath])
    }
  }

  const handleDoubleClick = (file: FileProps, fileExt: string | undefined) => {
    if (!fileExt) {
      setParams({path: file?.storageLink})
      setGoBackArray([...goBackArray, currentPath])
      if (file?.totalFolder === 0) {
        setGoForwardArray([])
      }
      setSelectedTreeFolder(file?.storageLink)
      setFolderTreeExpandValues([...folderTreeExpandValues, file?.storageLink])
    }
    if (isModal && fileExt) {
      editorCallBack &&
        editorCallBack?.callback(file?.downloadLink, {title: file?.basename}, file?.storageLink)
      handleCloseFileManagerModal && handleCloseFileManagerModal()
    }
  }

  const showFileTypes = (fileExt: string, file: FileProps) => {
    switch (fileExt) {
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'png':
        return <img src={file?.downloadLink} />
      case 'pdf':
        return <AiOutlineFilePdf />
      case 'xlxs':
      case 'xls':
      case 'csv':
        return <SiMicrosoftexcel />
      case 'folder':
        return <AiFillFolder />
      default:
        return <AiOutlineFileText />
    }
  }

  const handlePreviewModalClose = () => {
    setPreviewModalOpen(false)
  }

  const handleInfoModalClose = () => {
    setInfoModalOpen(false)
  }

  const handleUploadFilesModalClose = () => {
    setUploadFilesOpen(false)
  }

  return (
    <div className='fileManager'>
      <div className='card card-flush'>
        <div className='card-header pt-6 px-2'>
          <div className='card-title'>
            <div className='d-flex align-items-center position-relative my-1'>
              <span className='svg-icon svg-icon-1 position-absolute ms-6'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                >
                  <rect
                    opacity='0.5'
                    x='17.0365'
                    y='15.1223'
                    width='8.15546'
                    height='2'
                    rx='1'
                    transform='rotate(45 17.0365 15.1223)'
                    fill='black'
                  />
                  <path
                    d='M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z'
                    fill='black'
                  />
                </svg>
              </span>
              <input
                type='text'
                className='form-control form-control-solid w-250px ps-15'
                placeholder='Search Files &amp; Folders'
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className='card-toolbar-main'>
            <div className='card-toolbar'>
              <div className='d-flex justify-content-end' data-kt-filemanager-table-toolbar='base'>
                <button
                  type='button'
                  className='btn btn-primary me-3'
                  onClick={() => setAddFolderOpen(true)}
                >
                  <span className='svg-icon svg-icon-2'>
                    <AiOutlineFolderAdd />
                  </span>
                  New Folder
                </button>
                <div>
                  {/* <label htmlFor='file' className='btn btn-primary'>
                  <span className='svg-icon svg-icon-2'>
                    <BiUpload />
                  </span>
                  Upload Files
                </label> */}
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => setUploadFilesOpen(true)}
                  >
                    <span className='svg-icon svg-icon-2'>
                      <BiUpload />
                    </span>
                    Upload Files
                  </button>
                </div>
              </div>
              <div
                className='d-flex justify-content-end align-items-center d-none'
                data-kt-filemanager-table-toolbar='selected'
              >
                <div className='fw-bolder me-5'>
                  <span className='me-2' data-kt-filemanager-table-select='selected_count'></span>
                  Selected
                </div>
                <button
                  type='button'
                  className='btn btn-danger'
                  data-kt-filemanager-table-select='delete_selected'
                >
                  Delete Selected
                </button>
              </div>
            </div>
            <AddFolder
              addFolderOpen={addFolderOpen}
              setAddFolderOpen={setAddFolderOpen}
              currentPath={currentPath}
              loading={loading}
              renameFileFolder={renameFileFolder}
              selectedFile={selectedFile}
              params={params}
            />
          </div>
        </div>
        <div className='card-menu ps-8 px-2'>
          <TopHeaderMenu
            goBackArray={goBackArray}
            setGoBackArray={setGoBackArray}
            setGoForwardArray={setGoForwardArray}
            goForwardArray={goForwardArray}
            currentPath={currentPath}
            setParams={setParams}
            setSelectedTreeFolder={setSelectedTreeFolder}
            data={data}
            selectedFile={selectedFile}
            setInfoModalOpen={setInfoModalOpen}
            setPreviewModalOpen={setPreviewModalOpen}
            clickedFiles={clickedFiles}
            handleDoubleClick={handleDoubleClick}
          />
          <div id='spinner-parent' style={{height: 5}}></div>
        </div>
        <div className='card-body d-flex align-items-start px-2 pt-6'>
          <div style={{width: 350}}>
            <Tree
              data={mediaHierarchyTree}
              ref={treeRef}
              renderTreeNode={(nodeData) => {
                return (
                  <span>
                    {nodeData?.expand ? (
                      <AiFillFolderOpen size={18} color={'#FFCA28'} />
                    ) : (
                      <AiFillFolder size={18} color={'#FFCA28'} />
                    )}{' '}
                    {nodeData.label}
                  </span>
                )
              }}
              expandItemValues={folderTreeExpandValues}
              onExpand={(
                expandItemValues: ItemDataType[],
                activeNode: ItemDataType,
                concat: (data: ItemDataType[], children: ItemDataType[]) => ItemDataType[]
              ) => {
                setFolderTreeExpandValues(expandItemValues)
              }}
              onSelect={(item: ItemDataType, value: string | number) => {
                let stringValue = value.toString()
                setParams({path: stringValue})
                setSelectedTreeFolder(stringValue)
                if (stringValue.split('/').length > 1) {
                  setGoBackArray([...goBackArray, selectedTreeFolder])
                } else {
                  setGoBackArray([])
                }
              }}
              value={selectedTreeFolder}
              className='folderTree'
              virtualized
            />
          </div>
          {/* <div style={{height: 360, overflowY: 'auto', overflowX: 'hidden', width: '100%'}}> */}
          <div style={{overflowY: 'hidden', overflowX: 'hidden', width: '100%'}}>
            <Row>
              {!isEmpty(data) ? (
                data
                  ?.filter((file: FileProps) =>
                    file.basename.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((file: FileProps, i: number) => {
                    const fileExt =
                      file?.basename.split('.').length > 1 ? file?.basename.split('.').pop() : ''
                    return (
                      <Col lg={3} md={3} xs={6} key={i}>
                        <div
                          className={`folder ${
                            clickedFiles?.includes(file?.storageLink) ? 'active' : ''
                          }`}
                          onClick={(e) => {
                            handleSingleClick(e, file?.storageLink)
                            setSelectedFile({...file, fileExt})
                          }}
                          onContextMenu={(e) => {
                            e.preventDefault()
                            setShowMenu(true)
                            handleContextMenu(e, isModal)
                            handleSingleClick(e, file?.storageLink, 'ContextMenu')
                            setSelectedFile({...file, fileExt})
                          }}
                          onDoubleClick={() => {
                            handleDoubleClick(file, fileExt)
                            if (
                              (fileExt === 'jpg' ||
                                fileExt === 'jpeg' ||
                                fileExt === 'png' ||
                                fileExt === 'gif') &&
                              !isModal
                            ) {
                              setInfoModalOpen(false)
                              setPreviewModalOpen(true)
                            }
                          }}
                        >
                          <div className='icon'>
                            <div className='badge'>
                              <Badge content={fileExt} />
                            </div>
                            {showFileTypes(fileExt || file?.type, file)}
                          </div>
                          <div className='folderName'>{file?.basename}</div>
                        </div>
                      </Col>
                    )
                  })
              ) : (
                <div>No Files Found</div>
              )}
            </Row>
          </div>
        </div>
      </div>
      <PreviewModal
        open={previewModalOpen}
        handleClose={handlePreviewModalClose}
        file={selectedFile}
      />
      <InfoModal open={infoModalOpen} handleClose={handleInfoModalClose} file={selectedFile} />
      <UploadModal
        open={uploadFilesOpen}
        handleClose={handleUploadFilesModalClose}
        currentPath={currentPath}
        success={success}
        params={params}
        addFileData={addFileData}
        error={error}
      />
      <RightClickMenu
        showMenu={showMenu}
        xPos={xPos}
        yPos={yPos}
        selectedFile={selectedFile}
        setInfoModalOpen={setInfoModalOpen}
        setPreviewModalOpen={setPreviewModalOpen}
        clickedFiles={clickedFiles}
        handleDoubleClick={handleDoubleClick}
        setAddFolderOpen={setAddFolderOpen}
        setRenameFileFolder={setRenameFileFolder}
      />
    </div>
  )
}

export default FileManager
