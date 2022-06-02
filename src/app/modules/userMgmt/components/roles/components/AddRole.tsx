import {useEffect, useState} from 'react'
import * as Yup from 'yup'
import {ErrorMessage, Form, Formik} from 'formik'
import FormTextBox from '../../../../../../cms/helpers/components/forms/FormTextBox'
import {useDispatch, useSelector} from 'react-redux'
import * as rolePermission from '../../../../common/index'
import * as role from '../index'
import * as auth from 'src/app/modules/auth'
import {RoleModel} from '../../../Model'
import Modal from 'rsuite/Modal'
import CheckTree from 'rsuite/CheckTree'
import {isEmpty} from 'lodash'
import {toast} from 'react-toastify'
import {StateParamsModel} from 'src/app/modules/common/Model'

interface PermissionData {
  name: string
  id: string
  children: Array<PermissionData>
  action: {[key: string]: string | number}[]
}

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Must not contain number or symbol'),
})

const AddRole = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const [selectedPermissions, setSelectedPermission] = useState<Array<string>>([])
  const permissionData = useSelector((state: any) => state.permission)
  const roleData = useSelector((state: any) => state.role)
  const {loading, success} = roleData
  const stateData: Array<PermissionData> = permissionData?.data?.permission

  useEffect(() => {
    dispatch(rolePermission.action.getPermissions())
  }, [])

  useEffect(() => {
    if (success) {
      dispatch(role?.actions.getRole(params))
      isEmpty(editSelectedData)
        ? toast.success('Role added successfully')
        : toast.success('Role edited successfully')
      dispatch(role?.actions?.createRoleReset())
      dispatch(role?.actions?.updateRoleReset())
      dispatch(auth.actions.getUserModule())
      handleClose()
    }
  }, [success])

  useEffect(() => {
    if (!isEmpty(editSelectedData)) {
      let permissionDataIds: Array<string> = []
      editSelectedData?.permissions?.map((permissionId: any) =>
        permissionDataIds.push(permissionId.id)
      )

      stateData.map((item: PermissionData) => {
        let hasAllChildren = true
        item?.children?.map((child) => {
          if (!permissionDataIds.includes(child?.id)) {
            hasAllChildren = false
          } else {
            child?.children?.map((subChild) => {
              if (!permissionDataIds.includes(subChild?.id)) {
                hasAllChildren = false
              }
            })
          }
        })
        if (!hasAllChildren) {
          permissionDataIds = permissionDataIds.filter((id: string) => id !== item?.id)
        }
      })
      setSelectedPermission(permissionDataIds)
    }
  }, [editSelectedData, stateData])

  const data: any = stateData.map((item: PermissionData) => ({
    label: item.name,
    value: item.id,

    children: !isEmpty(item.children)
      ? item.children?.map((child: PermissionData) => ({
          label: child.name,
          value: child.id,
          children: child.action?.map((act) => ({
            label: act.name,
            value: act.id,
          })),
        }))
      : item.action?.map((act) => ({
          label: act.name,
          value: act.id,
        })),
  }))
  const permissionChange = (data: any) => {
    setSelectedPermission(data)
  }

  return (
    <div className='modal-container'>
      <Modal
        open={open}
        onClose={handleClose}
        backdrop='static'
        keyboard={false}
        enforceFocus={false}
      >
        <Modal.Header>
          <Modal.Title>{actionType} Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{name: '', permission: ''}}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, {setSubmitting}) => {
                const newData: any = [...selectedPermissions]
                data?.map((parent: any) => {
                  if (selectedPermissions?.includes(parent?.value)) {
                    parent.children?.map((child: any) => {
                      newData.push(child?.value)
                      child?.children?.map((subchild: any) => {
                        newData.push(subchild?.value)
                      })
                    })
                  } else {
                    parent.children?.map((child: any) => {
                      if (selectedPermissions?.includes(child?.value)) {
                        child?.children?.map((subchild: any) => {
                          newData.push(subchild?.value)
                        })
                      }
                    })
                  }
                })

                const formData: RoleModel = {
                  ...values,
                  permissions: newData?.map((data: string) => ({
                    id: data,
                  })),
                }
                if (!isEmpty(editSelectedData)) {
                  dispatch(role.actions.upateRole(formData, editSelectedData?.id))
                  dispatch(auth.actions.getUserModule())
                } else {
                  dispatch(role.actions.createRole(formData))
                  dispatch(auth.actions.getUserModule())
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = ['name']
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                  }
                }, [])
                return (
                  <Form>
                    <div className='pt-5 border-top'>
                      <div className='px-3'>
                        <FormTextBox
                          containerClassName='col-lg-12'
                          type='text'
                          placeholder='Role Name'
                          label='Role Name'
                          name='name'
                          onChange={handleChange}
                          errors={errors}
                          touched={touched}
                          required={true}
                        />
                        <label className='form-label fw-bolder text-dark fs-6 '>
                          Permissions <span className='text-danger'>*</span>
                        </label>
                        <CheckTree
                          data={data}
                          name='permission'
                          value={selectedPermissions}
                          onChange={(e: any) => permissionChange(e)}
                          style={{height: 'auto'}}
                        />
                        <div className='fv-plugins-message-container text-danger fw-bolder small text-end mt-1'>
                          <ErrorMessage
                            name='permission'
                            component='div'
                            className='field-error-message'
                          />
                        </div>

                        <div className='d-flex justify-content-end px-9 '>
                          <button
                            type='submit'
                            disabled={loading}
                            className='btn btn-primary btn-sm ms-3'
                          >
                            Save
                          </button>
                          <button
                            type='button'
                            onClick={handleClose}
                            className='btn btn-secondary btn-sm ms-3'
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AddRole
