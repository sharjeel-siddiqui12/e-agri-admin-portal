"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "./CommodityDetail.module.css";
import { ArrowLeft, Check, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - in real app, this would come from an API
const getCommodityById = (id) => {
  const allCommodities = [
    {
      id: 1,
      commodityId: "0001",
      mainCategory: "Agriculture",
      majorCategory: "Crops",
      classification: "Cereal & Grains",
      commodity: "Rice",
      createdBy: "Sameer",
      approvedBy: "--",
      status: "pending",
      createdDate: "01-01-2025",
      lastModifiedDate: "01-01-2025 10:30:00",
      modifiedBy: "Sameer"
    },
    {
      id: 10,
      commodityId: "0002",
      mainCategory: "Agriculture",
      majorCategory: "Crops",
      classification: "Cereal & Grains",
      commodity: "Wheat",
      createdBy: "Sameer",
      approvedBy: "@shahzad",
      status: "approved",
      createdDate: "01-01-2025",
      lastModifiedDate: "01-01-2025 12:00:00",
      modifiedBy: "@shahzad"
    }
  ];
  
  return allCommodities.find(commodity => commodity.id === parseInt(id));
};

export default function CommodityDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [commodity, setCommodity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const commodityData = getCommodityById(params.id);
      setCommodity(commodityData);
      setLoading(false);
    }
  }, [params.id]);

  const handleBack = () => {
    router.back();
  };

  const handleApprove = () => {
    if (commodity) {
      // In real app, this would be an API call
      console.log("Approving commodity:", commodity.id);
      
      // Update local state
      setCommodity(prev => ({
        ...prev,
        status: "approved",
        approvedBy: "@shahzad",
        lastModifiedDate: new Date().toLocaleString(),
        modifiedBy: "@shahzad"
      }));
      
      // Show success message
      alert("Commodity approved successfully!");
      
      // Navigate back after a short delay
      setTimeout(() => {
        router.push("/commodity-classification-approval");
      }, 1000);
    }
  };

  const handleReject = () => {
    if (commodity && window.confirm("Are you sure you want to reject this commodity?")) {
      // In real app, this would be an API call
      console.log("Rejecting commodity:", commodity.id);
      
      alert("Commodity rejected successfully!");
      router.push("/commodity-classification-approval");
    }
  };

  const handleDelete = () => {
    if (commodity && window.confirm("Are you sure you want to delete this commodity? This action cannot be undone.")) {
      // In real app, this would be an API call
      console.log("Deleting commodity:", commodity.id);
      
      alert("Commodity deleted successfully!");
      router.push("/commodity-classification-approval");
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (!commodity) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>
          <h2>Commodity Not Found</h2>
          <p>The requested commodity could not be found.</p>
          <Button onClick={handleBack} className={styles.backBtn}>
            <ArrowLeft className={styles.buttonIcon} />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Button onClick={handleBack} variant="outline" className={styles.backBtn}>
          <ArrowLeft className={styles.buttonIcon} />
          Back
        </Button>
        <h1 className={styles.heading}>Commodity Details</h1>
      </div>

      <div className={styles.detailCard}>
        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Commodity ID</span>
            <span className={styles.detailValue}>{commodity.commodityId}</span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Main Category</span>
            <span className={styles.detailValue}>{commodity.mainCategory}</span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Major Category</span>
            <span className={styles.detailValue}>{commodity.majorCategory}</span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Classification</span>
            <span className={styles.detailValue}>{commodity.classification}</span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Commodity Name</span>
            <span className={styles.detailValue}>{commodity.commodity}</span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Created by</span>
            <span className={styles.detailValue}>{commodity.createdBy}</span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Approved by</span>
            <span className={styles.detailValue}>{commodity.approvedBy}</span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Status</span>
            <span className={`${styles.statusBadge} ${styles[commodity.status]}`}>
              {commodity.status}
            </span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Created Date</span>
            <span className={styles.detailValue}>{commodity.createdDate}</span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Last Modified Date</span>
            <span className={styles.detailValue}>{commodity.lastModifiedDate}</span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Modified By</span>
            <span className={styles.detailValue}>{commodity.modifiedBy}</span>
          </div>
        </div>
        
        {commodity.status === "pending" && (
          <div className={styles.actions}>
            <Button onClick={handleApprove} className={styles.approveBtn}>
              <Check className={styles.buttonIcon} />
              Approve
            </Button>
            <Button onClick={handleReject} className={styles.rejectBtn}>
              <X className={styles.buttonIcon} />
              Reject
            </Button>
            <Button onClick={handleDelete} className={styles.deleteBtn}>
              <Trash2 className={styles.buttonIcon} />
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
