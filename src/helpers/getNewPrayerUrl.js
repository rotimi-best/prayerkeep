export default function useNewPrayerUrl(pathname, collectionId) {
  let modalTriggerPath = `${pathname}?prayerModal=open&prayerId=null`;

  if (collectionId) {
    modalTriggerPath += `&collectionId=${collectionId}`;
  }

  return modalTriggerPath;
};
