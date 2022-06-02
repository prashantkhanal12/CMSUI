import Modal from 'rsuite/Modal'
import {ReactSortable} from 'react-sortablejs'
import {Dispatch, SetStateAction} from 'react'
import {ItemType} from '../Model'

interface Props {
  isOpen?: boolean
  handleClose: () => void
  data: Array<ItemType>
  setSortData: Dispatch<SetStateAction<Array<ItemType>>>
  sortButtonName: string | undefined
  handleSubmitSort: ((data: Array<ItemType>) => void) | undefined
  loading: boolean | undefined
}
const SortModal = ({
  isOpen,
  handleClose,
  data,
  setSortData,
  sortButtonName,
  handleSubmitSort,
  loading,
}: Props) => {
  return (
    <>
      <Modal
        backdrop='static'
        role='alertdialog'
        open={isOpen}
        size='sm'
        onClose={handleClose}
        enforceFocus={false}
      >
        <Modal.Header>
          <Modal.Title>{sortButtonName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='mb-3'>
          <div  style={{height: '65vh', overflowY: 'auto'}}>
            <ReactSortable list={data} setList={setSortData}>
              {data?.map((item: ItemType) => (
                <>
                  <div className='btn btn-primary cursor-move rounded-0 w-100 mb-1' key={item.id}>
                    {item.name ? item.name : item.title}

                  </div>
                  {item?.children &&
                    item.children.map((child: any) => (
                      <div
                        className='btn btn-primary cursor-move rounded-0 w-100 mb-1'
                        key={child.id}
                      >
                        {child.tableViewName ? child.tableViewName : child.tableViewName}
                      </div>
                    ))}
                </>
              ))}
            </ReactSortable>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={`btn btn-primary btn-sm ms-3 ${loading ? 'disabled' : ''}`}
            disabled={loading}
            onClick={() => handleSubmitSort && handleSubmitSort(data)}
          >
            Save
          </button>
          <button onClick={handleClose} className='btn btn-secondary btn-sm ms-3'>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SortModal
