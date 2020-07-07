

const applicationServerPublicKey = 'BCue7AbRMDE6GPH0DWhS9kishGryuSKQxGm1Y_otQG9ai8wwUPVsTGGY7_iW-iVp5jxM0Nu2fBz6dDUknd-AHRk';

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


export async function getSubscription() {
    const serviceWorkerRegistration = await navigator.serviceWorker.register('./serviceWorker.js')
    const pushSubscription = await serviceWorkerRegistration.pushManager.getSubscription()
    return {
        serviceWorkerRegistration,
        pushSubscription
    }

}

async function tryToSubscribe() {
    const {pushSubscription, serviceWorkerRegistration} = await getSubscription()

    if (pushSubscription === null) {
        return await serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(applicationServerPublicKey)
        })
    }

    return pushSubscription
}


export async function subscribe() {
    try {
        return tryToSubscribe()
    } catch (e) {
        console.error('Failed to subscribe ', e);
    }
}

