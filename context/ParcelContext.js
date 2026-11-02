"use client";

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { INITIAL_PARCELS, DEFAULT_SETTINGS } from "@/lib/mock-data";

const ParcelContext = createContext(null);

const STORAGE_KEY_PARCELS = "parcelflow_parcels_v1";
const STORAGE_KEY_SETTINGS = "parcelflow_settings_v1";
const STORAGE_KEY_NOTIFS = "parcelflow_notifications_v1";

const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "New WhatsApp Batch Received",
    message: "4 parcel images were received and queued for OCR processing.",
    time: "10 mins ago",
    type: "info",
    read: false,
  },
  {
    id: "notif-2",
    title: "Weight Pending Alert",
    message: "Consignment BLU390184205IN requires manual scale measurement.",
    time: "25 mins ago",
    type: "warning",
    read: false,
  },
  {
    id: "notif-3",
    title: "Daily Excel Batch Ready",
    message: "Yesterday's complete manifest (8 parcels) is ready for download.",
    time: "2 hours ago",
    type: "success",
    read: true,
  },
];

export function ParcelProvider({ children }) {
  const [parcels, setParcels] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage or mock data
  useEffect(() => {
    try {
      const storedParcels = localStorage.getItem(STORAGE_KEY_PARCELS);
      if (storedParcels) {
        setParcels(JSON.parse(storedParcels));
      } else {
        setParcels(INITIAL_PARCELS);
        localStorage.setItem(STORAGE_KEY_PARCELS, JSON.stringify(INITIAL_PARCELS));
      }

      const storedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      } else {
        setSettings(DEFAULT_SETTINGS);
        localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
      }

      const storedNotifs = localStorage.getItem(STORAGE_KEY_NOTIFS);
      if (storedNotifs) {
        setNotifications(JSON.parse(storedNotifs));
      }
    } catch (e) {
      console.warn("LocalStorage access failed, fallback to in-memory:", e);
      setParcels(INITIAL_PARCELS);
      setSettings(DEFAULT_SETTINGS);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage
  const saveParcels = useCallback((updatedList) => {
    setParcels(updatedList);
    try {
      localStorage.setItem(STORAGE_KEY_PARCELS, JSON.stringify(updatedList));
    } catch (e) {
      console.error("Failed to persist parcels:", e);
    }
  }, []);

  const saveSettings = useCallback((updatedSettings) => {
    setSettings(updatedSettings);
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(updatedSettings));
    } catch (e) {
      console.error("Failed to persist settings:", e);
    }
  }, []);

  // Toast notification helper
  const addToast = useCallback((toast) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    const newToast = {
      id,
      title: toast.title,
      description: toast.description || "",
      type: toast.type || "info", // success, error, warning, info
      duration: toast.duration || 4000,
    };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, newToast.duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Add parcels from Upload page
  const addParcels = useCallback((newItems) => {
    setParcels((prev) => {
      const updated = [...newItems, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY_PARCELS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    // Add notification
    const newNotif = {
      id: "notif-" + Date.now(),
      title: "Parcels Imported",
      message: `${newItems.length} parcel(s) imported from WhatsApp and added to verification queue.`,
      time: "Just now",
      type: "info",
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    addToast({
      title: "Parcels Added Successfully",
      description: `${newItems.length} parcel image(s) processed and added to verification queue.`,
      type: "success",
    });
  }, [addToast]);

  // Update parcel fields
  const updateParcel = useCallback((id, updatedFields) => {
    let updatedItem = null;
    setParcels((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          updatedItem = { ...item, ...updatedFields };
          return updatedItem;
        }
        return item;
      });
      try {
        localStorage.setItem(STORAGE_KEY_PARCELS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    addToast({
      title: "Parcel Updated",
      description: `Consignment ${updatedItem?.consignmentNumber || id} details saved.`,
      type: "info",
    });

    return updatedItem;
  }, [addToast]);

  // Verify parcel (with weight)
  const verifyParcel = useCallback((id, data) => {
    let updatedItem = null;
    setParcels((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          updatedItem = {
            ...item,
            ...data,
            status: "verified",
            verifiedBy: "Rajesh Sharma",
            verifiedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          };
          return updatedItem;
        }
        return item;
      });
      try {
        localStorage.setItem(STORAGE_KEY_PARCELS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    addToast({
      title: "Parcel Verified",
      description: `Consignment ${updatedItem?.consignmentNumber || id} verified successfully.`,
      type: "success",
    });

    return updatedItem;
  }, [addToast]);

  // Reject parcel
  const rejectParcel = useCallback((id, reason) => {
    let updatedItem = null;
    setParcels((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          updatedItem = {
            ...item,
            status: "rejected",
            notes: reason || "Rejected during manual review.",
            verifiedBy: "Rajesh Sharma",
            verifiedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          };
          return updatedItem;
        }
        return item;
      });
      try {
        localStorage.setItem(STORAGE_KEY_PARCELS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    addToast({
      title: "Parcel Rejected",
      description: `Consignment ${updatedItem?.consignmentNumber || id} marked as rejected.`,
      type: "warning",
    });

    return updatedItem;
  }, [addToast]);

  // Delete parcel
  const deleteParcel = useCallback((id) => {
    setParcels((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY_PARCELS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    addToast({
      title: "Parcel Removed",
      description: "Parcel entry deleted from local records.",
      type: "info",
    });
  }, [addToast]);

  // Duplicate consignment check helper
  const isDuplicateConsignment = useCallback((consignmentNumber, currentParcelId) => {
    if (!consignmentNumber) return false;
    const cleanNumber = consignmentNumber.trim().toUpperCase();
    return parcels.some(
      (p) => p.id !== currentParcelId && p.consignmentNumber.trim().toUpperCase() === cleanNumber
    );
  }, [parcels]);

  // Reset to initial mock data (for demonstration purposes)
  const resetToMockData = useCallback(() => {
    saveParcels(INITIAL_PARCELS);
    saveSettings(DEFAULT_SETTINGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    try {
      localStorage.setItem(STORAGE_KEY_PARCELS, JSON.stringify(INITIAL_PARCELS));
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
      localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(INITIAL_NOTIFICATIONS));
    } catch (e) {}

    addToast({
      title: "Demo Data Reset",
      description: "Default demo records and settings have been restored.",
      type: "info",
    });
  }, [saveParcels, saveSettings, addToast]);

  // Mark all notifications as read
  const markNotificationsAsRead = useCallback(() => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      try {
        localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  }, []);

  // Compute stats for today (2026-11-02 by default or current date)
  const stats = useMemo(() => {
    // Format today as YYYY-MM-DD
    const todayStr = "2026-11-02"; // Matching current local demo time
    const todayParcels = parcels.filter((p) => p.bookingDate === todayStr);

    const todayTotal = todayParcels.length;
    const todayVerified = todayParcels.filter((p) => p.status === "verified").length;
    const todayPending = todayParcels.filter((p) => p.status === "pending").length;
    const todayWeightPending = todayParcels.filter(
      (p) => p.status === "pending" && (p.weight === "" || p.weight === undefined || p.weight === null)
    ).length;
    const todayRejected = todayParcels.filter((p) => p.status === "rejected").length;
    const todayCodTotal = todayParcels
      .filter((p) => p.isCod && p.status === "verified")
      .reduce((sum, p) => sum + (Number(p.codAmount) || 0), 0);

    const overallTotal = parcels.length;
    const overallVerified = parcels.filter((p) => p.status === "verified").length;
    const overallPending = parcels.filter((p) => p.status === "pending").length;
    const overallWeightPending = parcels.filter(
      (p) => p.status === "pending" && (p.weight === "" || p.weight === undefined || p.weight === null)
    ).length;

    return {
      todayStr,
      todayTotal,
      todayVerified,
      todayPending,
      todayWeightPending,
      todayRejected,
      todayCodTotal,
      overallTotal,
      overallVerified,
      overallPending,
      overallWeightPending,
    };
  }, [parcels]);

  return (
    <ParcelContext.Provider
      value={{
        parcels,
        settings,
        stats,
        notifications,
        toasts,
        isLoaded,
        addParcels,
        updateParcel,
        verifyParcel,
        rejectParcel,
        deleteParcel,
        saveSettings,
        resetToMockData,
        isDuplicateConsignment,
        markNotificationsAsRead,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ParcelContext.Provider>
  );
}

export function useParcels() {
  const context = useContext(ParcelContext);
  if (!context) {
    throw new Error("useParcels must be used within a ParcelProvider");
  }
  return context;
}

