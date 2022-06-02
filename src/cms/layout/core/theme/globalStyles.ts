import {createGlobalStyle} from 'styled-components'
import {darken} from 'polished'

export const GlobalStyles = createGlobalStyle`
 
a {
  color: ${({theme}: any) => theme.linkColor};
}

.primaryColor{
  color:  ${({theme}: any) => theme.primaryColor};
  &.svg-icon svg [fill]:not(.permanent):not(g) {
    fill:  ${({theme}: any) => theme.primaryColor};
}
}


.btn.btn-primary{
  color: ${({theme}: any) => theme.btnPrimaryTextColor};
  border-color: ${({theme}: any) => theme.btnPrimaryColor}!important;
  background-color: ${({theme}: any) => theme.btnPrimaryColor}!important;
  &:hover:not(.btn-active){
    color: ${({theme}: any) => theme.btnPrimaryTextColor};
    border-color: ${({theme}: any) => theme.btnPrimaryColor}!important;
    background-color: ${({theme}: any) =>
      theme.btnPrimaryColor
        ? darken(0.08, theme.btnPrimaryColor)
        : theme.btnPrimaryColor}!important;
  
  }
  &:focus:not(.btn-active){
    color: ${({theme}: any) => theme.btnPrimaryTextColor};
    border-color: ${({theme}: any) => theme.btnPrimaryColor}!important;
    background-color: ${({theme}: any) =>
      theme.btnPrimaryColor
        ? darken(0.08, theme.btnPrimaryColor)
        : theme.btnPrimaryColor}!important;
  
  }
}
.btn.btn-secondary{
  color: ${({theme}: any) => theme.btnSecondaryTextColor};
  border-color: ${({theme}: any) => theme.btnSecondaryBgcolor};
  background-color: ${({theme}: any) => theme.btnSecondaryBgcolor};
  &:hover:not(.btn-active){
    color: ${({theme}: any) => theme.btnSecondaryTextColor};
    border-color: ${({theme}: any) => theme.btnSecondaryBgcolor};
    background-color: ${({theme}: any) =>
      theme.btnSecondaryBgcolor
        ? darken(0.05, theme.btnSecondaryBgcolor)
        : theme.btnSecondaryBgcolor}!important;
      
  }
  &:focus:not(.btn-active){
    color: ${({theme}: any) => theme.btnSecondaryTextColor};
    border-color: ${({theme}: any) => theme.btnSecondaryBgcolor};
    background-color: ${({theme}: any) =>
      theme.btnSecondaryBgcolor
        ? darken(0.05, theme.btnSecondaryBgcolor)
        : theme.btnSecondaryBgcolor}!important;
      
  }
}


.aside.aside-dark {
  background-color: ${({theme}: any) => theme.sidebarBgcolor} !important;
  .menu{
    .menu-link {
      color:  ${({theme}: any) => theme.sidebarTextColor} !important;
        &.active{
          background-color: ${({theme}: any) =>
            theme.sidebarBgcolor
              ? darken(0.2, theme.sidebarBgcolor)
              : theme.sidebarBgcolor} !important;
          color:  ${({theme}: any) => theme.sidebarTextColor} !important;
          .menu-icon{
            .svg-icon{
              svg [fill]:not(.permanent):not(g){
                fill:${({theme}: any) => theme.sidebarIconColor}
              }
            }
          }
        }
    }
  
    .menu-item{
      .show > .menu-link {
        background-color:${({theme}: any) => theme.sidebarBgcolor} !important;
        filter: saturate(150%);
       
    }
      .menu-section{
        color:  ${({theme}: any) => theme.sidebarTextColor} !important;
      }
      .menu-link{
        .menu-bullet .bullet {
          background-color:${({theme}: any) => theme.sidebarTextColor}!important;
          &:hover{
            background-color:${({theme}: any) =>
              theme.sidebarBgcolor
                ? darken(0.2, theme.sidebarBgcolor)
                : theme.sidebarBgcolor}!important;
          }
      }

      .menu-title {
        color:${({theme}: any) => theme.sidebarTextColor}!important;
    }
    .menu-icon {
      .svg-icon svg [fill]:not(.permanent):not(g) {
        fill: ${({theme}: any) => theme.sidebarTextColor}!important;
    }
    }
      } 
    }
      
  
  }
  .separator {
    border-bottom-color: ${({theme}: any) => theme.sidebarTextColor}!important;
}
}
// .footer{
//   background-color:${({theme}: any) => theme.sidebarBgcolor};
// }
.header-fixed .header{
  background-color:${({theme}: any) => theme.headerBgcolor}!important;
}
.menu-state-title-primary .menu-item .menu-link.active .menu-title{
  color: ${({theme}: any) => theme.sidebarBgcolor}!important;
}


.overlay-bg{
  background:${({theme}: any) => theme.primaryColor}!important;
}
.login-wrapper{
  button{
    color:#ffffff;
    border-color: ${({theme}: any) => theme.primaryColor}!important;
    background-color:${({theme}: any) => theme.primaryColor}!important;
    transition:all .2s linear;
  &:hover {
  border: 1px solid ${({theme}: any) => theme.primaryColor}!important;
  background-color:${({theme}: any) =>
    theme.primaryColor ? darken(0.05, theme.primaryColor) : theme.primaryColor}!important;
  color:#ffffff;
  }  }
  .login-link{
    color:${({theme}: any) => theme.primaryColor}!important;
    &:hover {
      color:${({theme}: any) =>
        theme.primaryColor ? darken(0.05, theme.primaryColor) : theme.primaryColor}!important;
    } 
  }
}


.heading__component__title{
  color:${({theme}: any) => theme.primaryColor}
}

.rs_table .rs-table-cell-header .rs-table-cell-content{
  background-color:${({theme}: any) => theme.primaryColor}!important;
  .rs-table-cell-header-icon-sort{
    color:#ffffff;
  }
}

.rs-modal-title{
  color:${({theme}: any) => theme.primaryColor}!important;
  font-weight:bold;
}



.aside-dark .menu .menu-item.hover:not(.here) > .menu-link:not(.disabled):not(.active):not(.here), .aside-dark .menu .menu-item:not(.here) .menu-link:hover:not(.disabled):not(.active):not(.here) {
  background-color:${({theme}: any) =>
    theme.sidebarBgcolor ? darken(0.2, theme.sidebarBgcolor) : theme.sidebarBgcolor}!important;
}
.aside-dark .menu .menu-item.hover:not(.here) > .menu-link:not(.disabled):not(.active):not(.here) .menu-bullet .bullet, .aside-dark .menu .menu-item:not(.here) .menu-link:hover:not(.disabled):not(.active):not(.here) .menu-bullet .bullet {
background-color:${({theme}: any) =>
  theme.sidebarBgcolor ? darken(0.09, theme.sidebarBgcolor) : theme.sidebarBgcolor}!important;
}

.aside-dark .menu .menu-item.show > .menu-link {
background-color:${({theme}: any) =>
  theme.sidebarBgcolor ? darken(0.02, theme.sidebarBgcolor) : theme.sidebarBgcolor}!important;
}

.scrolltop{
background-color:${({theme}: any) => theme.primaryColor}!important;
&:hover{
  background-color:${({theme}: any) => theme.primaryColor}!important;

}
}
.dt-btn {
  &-primary {
    color: ${({theme}: any) => theme.btnPrimaryTextColor}!important;
    background: ${({theme}: any) => theme.btnPrimaryColor}!important;

    &:hover {
      background: ${({theme}: any) =>
        theme.btnPrimaryColor
          ? darken(0.05, theme.btnPrimaryColor)
          : theme.btnPrimaryColor}!important;
    }

  }

  &-outline {
    &-primary {
      color:${({theme}: any) => theme.btnPrimaryColor}!important;
      border-color:${({theme}: any) => theme.btnPrimaryColor}!important;

      &:hover {
        color:#fff;
        background:${({theme}: any) =>
          theme.btnPrimaryColor
            ? darken(0.05, theme.btnPrimaryColor)
            : theme.btnPrimaryColor}!important;
        border-color:${({theme}: any) =>
          theme.btnPrimaryColor
            ? darken(0.05, theme.btnPrimaryColor)
            : theme.btnPrimaryColor}!important;
      }

    }
  }

  &-secondary {
    color: ${({theme}: any) => theme.btnSecondaryBgcolor}!important;
    border-color: ${({theme}: any) => theme.btnSecondaryBgcolor}!important;
    &:hover {
      color:#fff;
      background: ${({theme}: any) =>
        theme.btnSecondaryBgcolor
          ? darken(0.05, theme.btnSecondaryBgcolor)
          : theme.btnSecondaryBgcolor}!important;
    }
  }

  &-destructive {}
}


.form-check.form-check-solid .form-check-input:checked {
  background-color: ${({theme}: any) => theme.primaryColor}!important;
}

.rs-input-group:focus-within,
.rs-input-group:not(.rs-input-group-disabled).rs-input-group-focus,
.rs-input-group:not(.rs-input-group-disabled):hover {
  border-color: ${({theme}: any) => theme.primaryColor}!important;
}

.custom-datepicker .input-group-text {
  background-color: ${({theme}: any) => theme.primaryColor}!important;
}
.nav-tabs {
  border-bottom: 1px solid ${({theme}: any) => theme.primaryColor};
  .nav-link {
    color: ${({theme}: any) => theme.primaryColor};
    &:hover, &:focus {
      border-color: ${({theme}: any) => theme.primaryColor};
      background: ${({theme}: any) => theme.primaryColor};
      color: white;
  }
}
}
.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
  color: white;
  background-color: ${({theme}: any) => theme.primaryColor};
  border-color: ${({theme}: any) => theme.primaryColor};
}

table thead tr{
  background-color:${({theme}: any) => theme.primaryColor};
  th{
    color:white!important;
  }
}

.form-check.form-check-solid .form-check-input:checked {
  background-color: ${({theme}: any) => theme.primaryColor};
}

.rs-input-group:focus-within,
.rs-input-group:not(.rs-input-group-disabled).rs-input-group-focus,
.rs-input-group:not(.rs-input-group-disabled):hover {
  border-color: ${({theme}: any) => theme.primaryColor};
}


.rs-input:focus, .rs-input:hover:not(:disabled) {

  border-color: ${({theme}: any) => theme.primaryColor};
}
.rs-pagination-btn.rs-pagination-btn-active {

  color: ${({theme}: any) => theme.primaryColor};
  border: 1px solid ${({theme}: any) => theme.primaryColor};
}
.rs-picker-default:not(.rs-picker-disabled) .rs-btn-active, .rs-picker-default:not(.rs-picker-disabled) .rs-btn:focus, .rs-picker-default:not(.rs-picker-disabled) .rs-btn:hover, .rs-picker-default:not(.rs-picker-disabled) .rs-picker-toggle-active, .rs-picker-default:not(.rs-picker-disabled) .rs-picker-toggle:focus, .rs-picker-default:not(.rs-picker-disabled) .rs-picker-toggle:hover {
  border-color: ${({theme}: any) => theme.primaryColor};
}

.rs-picker-has-value .rs-btn .rs-picker-toggle-value, .rs-picker-has-value .rs-picker-toggle .rs-picker-toggle-value {
  color: ${({theme}: any) => theme.primaryColor};
}

.rs-picker-select-menu-item.rs-picker-select-menu-item-focus, .rs-picker-select-menu-item:focus, .rs-picker-select-menu-item:hover {

  color: ${({theme}: any) => theme.primaryColor};
}
.rs-picker-select-menu-item.rs-picker-select-menu-item-active {
  color: ${({theme}: any) => theme.primaryColor};
}
.rs-panel-header {
  background-color: ${({theme}: any) => theme.primaryColor};
  color: white;
}`
