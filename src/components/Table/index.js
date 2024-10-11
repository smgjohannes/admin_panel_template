import React from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import Pagination from 'react-bootstrap-table2-paginator';
import * as Paginator from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';

const customTotal = (from, to, size) => (
  <div>
    Showing {from} to {to} of {size} entries
  </div>
);

const customSizePerPage = (props) => {
  const { options, currentSizePerPage, onSizePerPageChange } = props;

  const onPageChange = (e) => {
    const page = e.target.value;
    onSizePerPageChange(page);
  };

  return (
    <Row>
      <Col xs="auto">
        <Form.Select value={currentSizePerPage} onChange={onPageChange} className="pe-5">
          {options.map((o) => (
            <option key={o.page} value={o.page}>
              {o.text}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col xs="auto" className="d-flex align-items-center">
        entries per page
      </Col>
    </Row>
  );
};

const Table = (props) => {
  return (
    <>
      <ToolkitProvider
        keyField="id"
        search={true}
        columns={props.columns}
        data={props.entries}
        wrapperClasses="table-responsive"
      >
        {({ baseProps, searchProps }) => (
          <Paginator.PaginationProvider
            pagination={Pagination({
              custom: true,
              showTotal: true,
              alwaysShowAllBtns: true,
              firstPageText: 'First',
              prePageText: 'Prev',
              nextPageText: 'Next',
              lastPageText: 'Last',
              nextPageTitle: 'Go to next',
              prePageTitle: 'Go to previous',
              firstPageTitle: 'Go to first',
              lastPageTitle: 'Go to last',
              totalSize: props.entries.length,
              paginationTotalRenderer: customTotal,
              sizePerPageRenderer: customSizePerPage,
            })}
          >
            {({ paginationProps, paginationTableProps }) => (
              <Card border="light" className="shadow-sm">
                <div className="table-responsive py-2">
                  <Card.Header>
                    <Row>
                      <Col xs={12} md={6} className="py-1">
                        <Paginator.SizePerPageDropdownStandalone {...paginationProps} />
                      </Col>
                      {props.search && (
                        <Col xs={12} md={6} className="d-flex justify-content-md-end py-1">
                          <Search.SearchBar {...searchProps} />
                        </Col>
                      )}
                    </Row>
                  </Card.Header>

                  <BootstrapTable
                    {...baseProps}
                    {...paginationTableProps}
                    hover={true}
                    selectRow={props.selectRow}
                    noDataIndication="No records found"
                    bodyClasses="border-0"
                    rowClasses="border-bottom"
                    classes="table-flush dataTable-table"
                    headerClasses="thead-light"
                  />

                  <Card.Footer>
                    <Row>
                      <Col xs={12} md={6} className="d-flex align-items-center py-1">
                        <Paginator.PaginationTotalStandalone {...paginationProps} />
                      </Col>
                      <Col xs={12} md={6} className="d-flex justify-content-md-end align-items-center mb-0 py-1">
                        <Paginator.PaginationListStandalone {...paginationProps} />
                      </Col>
                    </Row>
                  </Card.Footer>
                </div>
              </Card>
            )}
          </Paginator.PaginationProvider>
        )}
      </ToolkitProvider>
    </>
  );
};

export default Table;
