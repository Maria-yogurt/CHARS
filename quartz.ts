
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"

ExternalPlugin.Explorer({
  sortFn: (a, b) => {
    const folderOrder = [
      "Личные дела",
      "Второстепенные персонажи",
      "Места действий",
    ]

    // Папки всегда идут перед файлами
    if (a.isFolder !== b.isFolder) {
      return a.isFolder ? -1 : 1
    }

    const aName = a.displayName
    const bName = b.displayName

    // Задаём приоритет нужным папкам
    if (a.isFolder && b.isFolder) {
      const aIndex = folderOrder.indexOf(aName)
      const bIndex = folderOrder.indexOf(bName)

      if (aIndex !== -1 || bIndex !== -1) {
        if (aIndex === -1) return 1
        if (bIndex === -1) return -1
        return aIndex - bIndex
      }
    }

    // Остальные папки и файлы сортируются по алфавиту
    return aName.localeCompare(bName, "ru", {
      numeric: true,
      sensitivity: "base",
    })
  },
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
