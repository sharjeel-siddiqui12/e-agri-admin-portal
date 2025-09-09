"use client";
import React, { useState } from "react";
import { Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import styles from "./chartsOfAccountsApproval.module.css";

const demoTableData = [
	{
		id: 1523,
		coaId: "1523",
		accountCode: "2001",
		accountType: "Liability",
		accountDescription: "Bank Charges Payable A/c",
		bank: "Meezan",
		accountNo: "44444444444444444444",
		currency: "PKR",
		openingBalance: "0",
		createdBy: "100201",
		createdDate: "7/24/2023 12:20:01 PM",
		modifiedBy: "0"
	},
	{
		id: 1524,
		coaId: "1524",
		accountCode: "2002",
		accountType: "Asset",
		accountDescription: "Cash Account",
		bank: "HBL",
		accountNo: "33333333333333333333",
		currency: "PKR",
		openingBalance: "50000",
		createdBy: "100201",
		createdDate: "7/24/2023 12:20:01 PM",
		modifiedBy: "0"
	},
	{
		id: 1525,
		coaId: "1525",
		accountCode: "2003",
		accountType: "Liability",
		accountDescription: "Accounts Payable",
		bank: "NBP",
		accountNo: "55555555555555555555",
		currency: "PKR",
		openingBalance: "25000",
		createdBy: "100201",
		createdDate: "7/24/2023 12:20:01 PM",
		modifiedBy: "0"
	}
];

export default function ChartsOfAccountsApprovalPage() {
	const [tableData] = useState(demoTableData);
	const [selectedRow, setSelectedRow] = useState(null);
	const [showDetail, setShowDetail] = useState(false);

	const handleViewDetails = (row) => {
		setSelectedRow(row);
		setShowDetail(true);
	};

	const handleCloseDetail = () => {
		setShowDetail(false);
		setSelectedRow(null);
	};

	// Demo handlers for approve/reject/delete
	const handleApprove = () => {
		setShowDetail(false);
	};
	const handleReject = () => {
		setShowDetail(false);
	};
	const handleDelete = () => {
		setShowDetail(false);
	};

	return (
		<div className={styles.page}>
			<h1 className={styles.heading}>Chart of Accounts Setup (Approval)</h1>
			<div className={styles.tableWrap}>
				<Table className={styles.table}>
					<TableHeader>
						<TableRow>
							<TableHead className={styles.th}>COA ID</TableHead>
							<TableHead className={styles.th}>Account Code</TableHead>
							<TableHead className={styles.th}>Account Type</TableHead>
							<TableHead className={styles.th}>Account Description</TableHead>
							<TableHead className={styles.th}>Bank</TableHead>
							<TableHead className={styles.th}>Currency</TableHead>
							<TableHead className={styles.th}>Opening Balance</TableHead>
							<TableHead className={styles.th}>Created By</TableHead>
							<TableHead className={styles.th}></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{tableData.map(row => (
							<TableRow key={row.id} className={styles.tr} onClick={() => handleViewDetails(row)} style={{ cursor: "pointer" }}>
								<TableCell className={styles.td}>{row.coaId}</TableCell>
								<TableCell className={styles.td}>{row.accountCode}</TableCell>
								<TableCell className={styles.td}>{row.accountType}</TableCell>
								<TableCell className={styles.td}>{row.accountDescription}</TableCell>
								<TableCell className={styles.td}>{row.bank}</TableCell>
								<TableCell className={styles.td}>{row.currency}</TableCell>
								<TableCell className={styles.td}>{row.openingBalance}</TableCell>
								<TableCell className={styles.td}>{row.createdBy}</TableCell>
								<TableCell className={styles.td} onClick={e => { e.stopPropagation(); handleViewDetails(row); }}>
									<Eye size={20} color="#375515" style={{ verticalAlign: "middle" }} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{/* Right-side modal drawer for details */}
			{showDetail && selectedRow && (
				<div className={styles.detailDrawer}>
					<button className={styles.closeBtn} onClick={handleCloseDetail} title="Close">×</button>
					<div className={styles.detailGrid}>
						<div>
							<div className={styles.detailLabel}>COA ID</div>
							<div className={styles.detailValue}>{selectedRow.coaId}</div>
						</div>
						<div>
							<div className={styles.detailLabel}>Account Code</div>
							<div className={styles.detailValue}>{selectedRow.accountCode}</div>
						</div>
						<div>
							<div className={styles.detailLabel}>Account Type</div>
							<div className={styles.detailValue}>{selectedRow.accountType}</div>
						</div>
						<div>
							<div className={styles.detailLabel}>Account Description</div>
							<div className={styles.detailValue}>{selectedRow.accountDescription}</div>
						</div>
						<div>
							<div className={styles.detailLabel}>Bank</div>
							<div className={styles.detailValue}>{selectedRow.bank}</div>
						</div>
						<div>
							<div className={styles.detailLabel}>Account no.</div>
							<div className={styles.detailValue}>{selectedRow.accountNo}</div>
						</div>
						<div>
							<div className={styles.detailLabel}>Currency</div>
							<div className={styles.detailValue}>{selectedRow.currency}</div>
						</div>
						<div>
							<div className={styles.detailLabel}>Opening Balance</div>
							<div className={styles.detailValue}>{selectedRow.openingBalance}</div>
						</div>
						<div>
							<div className={styles.detailLabel}>Created By</div>
							<div className={styles.detailValue}>{selectedRow.createdBy}</div>
						</div>
						<div>
							<div className={styles.detailLabel}>Created Date</div>
							<div className={styles.detailValue}>{selectedRow.createdDate}</div>
						</div>
						<div>
							<div className={styles.detailLabel}>Modified By</div>
							<div className={styles.detailValue}>{selectedRow.modifiedBy}</div>
						</div>
					</div>
					<div className={styles.detailActions}>
						<button className={styles.approveBtn} onClick={handleApprove}>Approve</button>
						<button className={styles.rejectBtn} onClick={handleReject}>Reject</button>
						<button className={styles.deleteBtn} onClick={handleDelete}>Delete</button>
					</div>
				</div>
			)}
		</div>
	);
}
