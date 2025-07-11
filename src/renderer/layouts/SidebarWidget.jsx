import React, { use, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAppVersion } from "../redux/slices/appSlice";
export default function SidebarWidget() {

  const app = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [isDOwnloading, setIsDownloading] = React.useState(false);
  const [downloadProgress, setDownloadProgress] = React.useState(0);
  const [isDownloaded, setIsDownloaded] = React.useState(false);

  useEffect(() => {

    async function fetchAppVersion() {
      try {
        const version = await window.electron.app.getVersion();
        console.log(version, "version");
        dispatch(setAppVersion(version));
      } catch (error) {
        console.error("Error fetching app version:", error);
      }
    }

    fetchAppVersion();
  }, [app]);



  const download = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    try {

      await window.electron.messages.onMessage((type, title, data) => {
        if (title == "Descargando actualización") {
          setDownloadProgress(data);
        }
        if (title == "actualización descargada") {
          setIsDownloaded(true);
          setIsDownloading(false);

        }
        if (type === "error") {
          console.error("Error downloading update:", data);
          setIsDownloaded(false);
        }
        if (type === "success") {
          console.log("Update downloaded successfully:", data);
          setIsDownloaded(true);
        }
      })
      const result = await window.electron.updater.downloadUpdate();

    } catch (error) {
      console.error("Error downloading update:", error);
      // setIsDownloaded(false);
    }
  }

  
  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]`}
    >
      Version de la aplicacion {app?.appVersion}

      {
        app?.isUpdateAvailable && (
          <div>
            <p className="text-red-500 text-sm mt-2">
              Hay una nueva actualización disponible: {app?.latesVersion}
            </p>

            {
              isDownloaded ? (
                <div>
                  <p className="text-sm text-green-500 mt-1">Descarga completa!</p>
                  <button
                    className="mt-2 p-1 rounded-md bg-blue-500 text-white"
                    onClick={() => {
                      window.electron.updater.installUpdate();
                    }} >instalar </button>

                </div>
              ) :
                (<button
                  onClick={download}
                  disabled={isDOwnloading || isDownloaded}
                  className="p-1 rounded-md bg-green-400 text-white">descargar
                </button>)
            }

            {
              isDOwnloading && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Descargando...</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${downloadProgress}%` }}
                    ></div>
                  </div>

                </div>
              )
            }
          </div>
        )
      }

      {/* <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        #1 Tailwind CSS Dashboard
      </h3>
      <p className="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
        Leading Tailwind CSS Admin Template with 400+ UI Component and Pages.
      </p>
      <a
        href="https://tailadmin.com/pricing"
        target="_blank"
        rel="nofollow"
        className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-brand-500 text-theme-sm hover:bg-brand-600"
      >
        Purchase Plan
      </a> */}
    </div>
  );
}
