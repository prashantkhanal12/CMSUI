import React, { FC, useEffect, useState } from 'react'
import Table from 'rsuite/Table'
import Checkbox from 'rsuite/Checkbox'
import { columnModel } from './Models/columnModel'
import { SortType } from 'rsuite-table/lib/@types/common'
import { isEmpty } from 'lodash'

const Column = Table.Column
const HeaderCell = Table.HeaderCell
const Cell = Table.Cell

type Props = {
  showCheckbox?: boolean
  onChecked?: (values: Array<string>) => void
  columns: columnModel[]
  data: { [key: string]: any }[] | []
  height?: number
  showLoading?: boolean
  handleSort?: (dataKey: string, sortType?: SortType) => void
  checkedValues?: Array<string>
}

const RSuiteTable = (props: Props) => {
  const [sortColumn, setSortColumn] = useState<string>()
  const [sortType, setSortType] = useState<SortType | undefined>()
  const [loading, setLoading] = useState(false)
  const [checkedKeys, setCheckedKeys] = useState<Array<string | number>>(props?.checkedValues || [])
  let checked = false
  let indeterminate = false

  useEffect(() => {
    if (!isEmpty(props.checkedValues) && isEmpty(checkedKeys)) {
      setCheckedKeys(props?.checkedValues || [])
    }

    if (isEmpty(props.checkedValues)) {
      setCheckedKeys([])
    }
  }, [props?.checkedValues])

  if (checkedKeys.length === props?.data?.length && checkedKeys.length !== 0) {
    checked = true
  } else if (checkedKeys.length === 0) {
    checked = false
  } else if (checkedKeys.length > 0 && checkedKeys.length < props?.data?.length) {
    indeterminate = true
  }

  const handleCheckAll = (value: any, checked: boolean) => {
    const keys = checked ? props?.data.map((item: any) => item.id) : []
    setCheckedKeys(keys)
    props?.showCheckbox && props?.onChecked && props?.onChecked(keys)
  }

  const handleCheck = (value: string, checked: boolean) => {
    const keys: any = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter((item) => item !== value)
    setCheckedKeys(keys)
    props?.showCheckbox && props?.onChecked && props?.onChecked(keys)
  }

  const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }: any) => (
    <Cell {...props} style={{ padding: 0 }}>
      <div style={{ lineHeight: '46px' }}>
        <Checkbox
          value={rowData[dataKey]}
          inline
          onChange={onChange}
          checked={checkedKeys.some((item: any) => item === rowData[dataKey])}
        />
      </div>
    </Cell>
  )

  const handleSortColumn = (dataKey: string, sortType?: SortType) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSortColumn(dataKey)
      setSortType(sortType)
    }, 500)
    props?.handleSort && props?.handleSort(dataKey, sortType)
  }

  return (
    <>
      <Table
        // height={props?.height}
        autoHeight={true}
        data={props?.data}
        id='table'
        className="rs_table"
        loading={props?.showLoading || loading}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
      >
        {props?.showCheckbox && (
          <Column width={50} align='center'>
            <HeaderCell style={{ padding: 0, color: '#fff' }}>
              <div style={{ lineHeight: '40px' }}>
                <Checkbox
                  inline
                  checked={checked}
                  indeterminate={indeterminate}
                  onChange={handleCheckAll}
                />
              </div>
            </HeaderCell>
            <CheckCell dataKey='id' checkedKeys={checkedKeys} onChange={handleCheck} />
          </Column>
        )}

        {props?.columns?.map((column: columnModel, i: number) => (
          <Column
            width={column.width}
            flexGrow={column.flexGrow}
            align={'left'}
            key={i}
            sortable={column?.sortable}
          >
            <HeaderCell style={{ color: '#fff' }}>
              {column?.label}
            </HeaderCell>
            {column?.cell}
          </Column>
        ))}
      </Table>
    </>
  )
}

export default RSuiteTable
