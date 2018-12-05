using Amazon.S3;
using Amazon.S3.Transfer;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using VicFit.Web.Interfaces;
using VicFit.Web.Models;
using VicFit.Web.Requests;
using VicFit.Web.Responses;

namespace VicFit.Web.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/filestorage")]
    public class FileStorageApiController : ApiController
    {
        string serverFileName = string.Empty;
        string fqn = string.Empty;
        private IFileStorageService _fileStorageService;

        public FileStorageApiController(IFileStorageService fileStorageService)
        {
            _fileStorageService = fileStorageService;
        }

        [HttpPost]
        [Route("{userId}")]
        public HttpResponseMessage Upload(string userId)
        {
            HttpPostedFile postedFile = HttpContext.Current.Request.Files[0];

            // Generate GUID for system file name
            serverFileName = string.Format("{0}_{1}.{2}",
                Path.GetFileNameWithoutExtension(postedFile.FileName), Guid.NewGuid().ToString(),"jpg");

            FileStorageAddRequest fileStorageAddRequest = new FileStorageAddRequest
            {
                UserFileName = postedFile.FileName,
                BasePath = "C61/vicfit-profileimages",
                SystemFileName = serverFileName,
                UserId = userId
            };

            // PostedFile.contentType = type of media file
            string contentType = Request.Content.Headers.ContentType.MediaType;

            // Define required parameters for AWS
            string bucketName = "sabio-training/C61/vicfit-profileimages";
            string accessKey = "AKIAJF53EJKW7SJUV55Q";
            string secretKey = "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";

            try
            {
                using (AmazonS3Client s3Client = new AmazonS3Client(accessKey, secretKey, Amazon.RegionEndpoint.USWest2))
                {
                    using (TransferUtility fileTransferUtility = new TransferUtility(s3Client))
                    {
                        TransferUtilityUploadRequest request = new TransferUtilityUploadRequest
                        {
                            BucketName = bucketName,
                            Key = serverFileName,
                            InputStream = postedFile.InputStream
                        };
                        fileTransferUtility.Upload(request);

                        int id = _fileStorageService.Create(fileStorageAddRequest);
                        ItemResponse<int> resp = new ItemResponse<int>();
                        resp.Item = id;
                        return Request.CreateResponse(HttpStatusCode.OK, resp);
                    }
                }
            }
            catch (AmazonS3Exception amznEx)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, amznEx);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        [Route("{userId}")]
        public HttpResponseMessage SelectByUserId(string userId)
        {
            try
            {
                ItemResponse<FileStorageViewModel> resp = new ItemResponse<FileStorageViewModel>();
                resp.Item = _fileStorageService.SelectByUserId(userId);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public HttpResponseMessage Update(int id)
        {
            HttpPostedFile postedFile = HttpContext.Current.Request.Files[0];

            // Generate GUID for system file name
            serverFileName = string.Format("{0}_{1}.{2}",
                Path.GetFileNameWithoutExtension(postedFile.FileName),
                Guid.NewGuid().ToString(),
                "jpg");

            // Metadata object for saving to SQL database
            FileStorageUpdateRequest fileStorageUpdateRequest = new FileStorageUpdateRequest
            {
                Id = id,
                UserFileName = postedFile.FileName,
                BasePath = "C61/vicfit-profileimages",
                SystemFileName = serverFileName,
            };

            // PostedFile.contentType = type of media file
            string contentType = Request.Content.Headers.ContentType.MediaType;

            // Define required parameters for AWS
            string bucketName = "sabio-training/C61/vicfit-profileimages";
            string accessKey = "AKIAJF53EJKW7SJUV55Q";
            string secretKey = "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";

            try
            {
                using (AmazonS3Client s3Client = new AmazonS3Client(accessKey, secretKey, Amazon.RegionEndpoint.USWest2))
                {
                    using (TransferUtility fileTransferUtility = new TransferUtility(s3Client))
                    {
                        TransferUtilityUploadRequest request = new TransferUtilityUploadRequest
                        {
                            BucketName = bucketName,
                            Key = serverFileName,
                            InputStream = postedFile.InputStream
                        };
                        fileTransferUtility.Upload(request);

                        _fileStorageService.Update(fileStorageUpdateRequest);
                        return Request.CreateResponse(HttpStatusCode.OK);
                    }
                }
            }
            catch (AmazonS3Exception amznEx)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, amznEx);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}