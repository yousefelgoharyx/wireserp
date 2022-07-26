import useRead from '../hooks/useRead';

const useSettings = () => {
  const { data: settings } = useRead<AllSettings[]>(
    ['all-settings'],
    '/system-settings'
  );
  return settings[0];
};

export default useSettings;
