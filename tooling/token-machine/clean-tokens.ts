
import { rm } from 'fs/promises';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Deletes a list of folders (and their contents) given their paths.
 *
 * @param folderPaths - An array of string paths to the folders you want to delete.
 */
async function deleteFolders(folderPaths: string[]): Promise<void> {
  const deletePromises = folderPaths.map(async (folderPath) => {
    try {
      if (!existsSync(folderPath)) {
        console.log(`ℹ️  Folder does not exist, skipping: ${folderPath}`);
        return;
      }
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
    const foldersToClean = [
      path.join(__dirname, 'source'),
      path.join(__dirname, '../../packages/foundations/tokens/dist/'),
    ];
    await deleteFolders(foldersToClean);
  } catch (error) {
    console.error('Fatal execution error:', error);
    process.exit(1);
  }
})();
