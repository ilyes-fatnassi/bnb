import React from 'react';

const Table = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-clay ${className}`}>
        {children}
      </table>
    </div>
  );
};

const TableHead = ({ 
  children, 
  className = '' 
}) => {
  return (
    <thead className={className}>
      <tr>
        {children}
      </tr>
    </thead>
  );
};

const TableBody = ({ 
  children, 
  className = '' 
}) => {
  return (
    <tbody className={`divide-y divide-clay ${className}`}>
      {children}
    </tbody>
  );
};

const TableRow = ({ 
  children, 
  className = '' 
}) => {
  return (
    <tr className={className}>
      {children}
    </tr>
  );
};

const TableHeader = ({ 
  children, 
  className = '' 
}) => {
  return (
    <th className={`px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider ${className}`}>
      {children}
    </th>
  );
};

const TableCell = ({ 
  children, 
  className = '' 
}) => {
  return (
    <td className={`px-6 py-4 whitespace-nowrap text-sm text-charcoal ${className}`}>
      {children}
    </td>
  );
};

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Header = TableHeader;
Table.Cell = TableCell;

export default Table;