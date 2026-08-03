import { createClient } from "@/lib/supabase/client";
import { STORAGE_BUCKETS, UPLOAD_LIMITS } from "@/lib/constants";

/**
 * Storage Service
 *
 * Handles file uploads to Supabase Storage.
 * Validates file type and size before uploading.
 */
export const storageService = {
  /**
   * Uploads an image to a specified bucket
   */
  async uploadImage(
    file: File,
    bucket: keyof typeof STORAGE_BUCKETS,
    path: string
  ): Promise<{ url: string; path: string } | null> {
    // Validate file type
    const allowedTypes = UPLOAD_LIMITS.image.allowedTypes as readonly string[];
    if (!allowedTypes.includes(file.type)) {
      throw new Error(`File type ${file.type} is not allowed. Use JPEG, PNG, or WebP.`);
    }

    // Validate file size
    if (file.size > UPLOAD_LIMITS.image.maxSize) {
      throw new Error(`File size exceeds the 5MB limit.`);
    }

    const supabase = createClient();
    const bucketName = STORAGE_BUCKETS[bucket];
    const filePath = `${path}/${Date.now()}-${file.name.replace(/\s/g, "-")}`;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    return {
      url: urlData.publicUrl,
      path: data.path,
    };
  },

  /**
   * Deletes a file from storage
   */
  async deleteFile(bucket: keyof typeof STORAGE_BUCKETS, path: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase.storage
      .from(STORAGE_BUCKETS[bucket])
      .remove([path]);

    if (error) throw error;
  },

  /**
   * Gets a temporary signed URL for private files
   */
  async getSignedUrl(
    bucket: keyof typeof STORAGE_BUCKETS,
    path: string,
    expiresIn = 3600
  ): Promise<string> {
    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKETS[bucket])
      .createSignedUrl(path, expiresIn);

    if (error) throw error;
    return data.signedUrl;
  },
};
