import conf from "../conf/conf";
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            const post = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                title,
                content,
                featuredImage,
                status,
                userId
                }
            );
            return post;
        } catch (error) {
            console.log("createPost error: ", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            const post = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                title,
                content,
                featuredImage,
                status
                }
            );
            return post;
        } catch (error) {
            console.log("updatePost error: ", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("deletePost error: ", error)
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("getPost error: ", error)
            return false;
        }
    }


    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
          const response = await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
          );
          console.log('getPosts response:', response); // Log the response
          return response;
        } catch (error) {
          console.log('getPosts error:', error);
        }
      }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("uploadFile error: ",error)
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
           console.log("deleteFile error: ",error) 
           return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
    
}

const service = new Service()

export default service;
