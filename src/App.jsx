import * as React from 'react';
import {DataGrid, GridPagination} from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';
import {useState} from "react";
import './App.css'
import Pagination from "@mui/material/Pagination";

const initialColumns = [
    {
        field: 'user',
        headerName: 'کاربر',
        width: 150,
        headerClassName: 'data-grid-column',
        cellClassName: 'data-grid-row',
    },
    {
        field: 'role',
        headerName: 'نقش',
        width: 150,
        headerClassName: 'data-grid-column',
        cellClassName: 'data-grid-row',
        editable: true,
    },
    {
        field: 'project',
        headerName: 'طرح',
        width: 150,
        headerClassName: 'data-grid-column',
        cellClassName: 'data-grid-row',
        editable: true,
    },
    {
        field: 'invoice',
        headerName: 'صورتحساب',
        width: 110,
        headerClassName: 'data-grid-column',
        cellClassName: 'data-grid-row',
        editable: true,
    },
    {
        field: 'status',
        headerName: 'وضعیت',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        headerClassName: 'data-grid-column',
        cellClassName: 'data-grid-row',
        valueGetter: (value, row) => `${row.status === 1 ? 'فعال' : row.status === 0 ? 'درانتظار' : 'غیرفعال'}`,
    },
    {
        field: 'actions',
        headerName: 'عمل ها',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        headerClassName: 'data-grid-column',
        cellClassName: 'data-grid-row',
        width: 160,
    },
];


const initialRows = [
    {id: 1, user: 'حسین رستمی', role: 'ادمین', project: 'دستی - پی پال', invoice: 14, status: 1},
    {id: 2, user: 'علی بینظیر', role: 'مدرس', project: 'پرداخت خودکار', invoice: 31, status: 1},
    {id: 3, user: 'سینا بینظیر', role: 'ادمین', project: 'پرداخت خودکار', invoice: 31, status: -1},
    {id: 4, user: 'پرهام بیات', role: 'دانشجو', project: 'دستی - پی پال', invoice: 11, status: -1},
    {id: 5, user: 'علی مشعورا', role: 'دانشجو', project: 'پرداخت خودکار', invoice: 43, status: 0},
    {id: 6, user: 'محسن رستمی', role: 'مدرس', project: 'دستی - پی پال', invoice: 150, status: 1},
    {id: 7, user: 'فاطمه رستمی', role: 'مدرس', project: 'پرداخت خودکار', invoice: 44, status: -1},
    {id: 8, user: 'سمیه رستمی', role: 'ادمین', project: 'دستی - پی پال', invoice: 36, status: 1},
    {id: 9, user: 'زهرا حبیب زاره', role: 'ادمین', project: 'دستی - پی پال', invoice: 65, status: 0},
];

function MyPagination(props) {
    let { page, onPageChange, className, count, rowsPerPage } = props
    return (
        <>
            <Pagination
                color="primary"
                className={className}
                page={page + 1}
                count={Math.ceil(count / rowsPerPage)}
                onChange={(event, newPage) => {
                    onPageChange(event, newPage - 1);
                }}
            />
        </>
    );
}

export function CustomToolbar() {
    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
            <button>Button 1</button>
            <button>Button 2</button>
        </div>
    )
}

function CustomPagination(props) {
    console.log(props)
    return <GridPagination toolbar={CustomToolbar} labelRowsPerPage='' ActionsComponent={MyPagination} {...props} />;
}

export default function App() {
    const [paginationModal, setPaginationModal] = useState({
        page: 0,
        pageSize: 2
    })

    const [rows, setRows] = useState(initialRows)
    const [columns, setColumns] = useState(initialColumns)
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            width: '100%'
        }}>
            <div style={{height: 400, width: 1400}}>
                <DataGrid
                    pagination
                    slots={{
                        pagination: CustomPagination,
                    }}
                    initialState={{
                        pagination: {paginationModel: paginationModal},
                    }}
                    pageSizeOptions={[]} // باعث غیرفعال شدن انتخاب تعداد آیتم‌ها در صفحه می‌شود
                    rows={rows}
                    columns={columns}

                />
            </div>
        </div>
    );
}