/**
 * Android JS Bridge Utility
 * Communicates with the native Android WebView wrapper
 */

declare global {
  interface Window {
    onCloseInterstitialAd: () => Promise<void> | void
    rewardUser: () => Promise<void> | void
    onCameraResult: (base64Image: string) => void;
    AndroidBridge?: {
      openCamera: () => void;
      showInterstitialAd: () => void;
      requestCameraPermission: () => void;
      checkPermission:  () => boolean;
      showRewardedAd: () => void;
      shareImage: (base64: string) => void;
      vibrate: (duration: number) => void;
      openCheckoutUrl: (url: string) => void;
    };
  }
}

export const androidBridge = {
  /**
   * Checks if the app is running in the Android WebView
   */
  isAndroid: () => {
    return typeof window !== 'undefined' && !!window.AndroidBridge;
  },

  /**
   * Opens a checkout URL in a new Android activity
   */
  openCheckout: (url: string) => {
    if (window.AndroidBridge?.openCheckoutUrl) {
      window.AndroidBridge.openCheckoutUrl(url);
    } else {
      console.log("AndroidBridge: Opening checkout URL (not in WebView):", url);
      window.location.href = url;
    }
  },

  /**
   * Triggers an interstitial ad via the Android bridge
   */
  showInterstitial: () => {
    if (window.AndroidBridge?.showInterstitialAd) {
      window.AndroidBridge.showInterstitialAd();
    } else {
      console.log("AndroidBridge: Interstitial ad requested (not in WebView)");
    }
  },

  /**
   * Triggers a rewarded ad via the Android bridge
   */
  showRewarded: () => {
    if (window.AndroidBridge?.showRewardedAd) {
      window.AndroidBridge.showRewardedAd();
    } else {
      console.log("AndroidBridge: Rewarded ad requested (not in WebView)");
      // For testing in browser, we'll simulate a success after 2 seconds
      return new Promise<boolean>((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      });
    }
    return null; // Native will handle the callback via a global function
  },

  /**
   * Triggers a haptic feedback
   */
  vibrate: (duration = 50) => {
    if (window.AndroidBridge?.vibrate) {
      window.AndroidBridge.vibrate(duration);
    } else if (navigator.vibrate) {
      navigator.vibrate(duration);
    }
  }
};

// Global callback for rewarded ads (called from Android native code)
if (typeof window !== 'undefined') {
  (window as any).onRewardedAdCompleted = () => {
    const event = new CustomEvent('rewardedAdCompleted');
    window.dispatchEvent(event);
  };
}

