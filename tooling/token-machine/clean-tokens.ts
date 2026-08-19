
import { rm } from 'fs/promises';

/**
 * Deletes a list of folders (and their contents) given their paths.
 * 
 * @param folderPaths - An array of string paths to the folders you want to delete.
 */
async function deleteFolders(folderPaths: string[]): Promise<void> {
  const deletePromises = folderPaths.map(async (folderPath) => {
    try {
      // recursive: true deletes folder contents, force: true ignores missing files/folders
      await rm(folderPath, { recursive: true, force: true });
      console.log(`✅ Successfully deleted: ${folderPath}`);
    } catch (error) {
      console.error(`❌ Error deleting ${folderPath}:`, error);
    }
  });

  // Wait for all deletion operations to complete
  await Promise.all(deletePromises);
}

(async () => {
  try {
    const foldersToClean = ['./tokens', '../../packages/zebra-design-system-tokens/dist/css/', '../../packages/zebra-design-system-tokens/dist/flutter/lib/', '../../packages/zebra-design-system-tokens/dist/js/'];
    await deleteFolders(foldersToClean);
  } catch (error) {
    console.error('Fatal execution error:', error);
    process.exit(1);
  }
})();
