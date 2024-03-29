// Describes when the clients can retry a failed request. Clients could ignore
// the recommendation here or retry when this information is missing from error
// responses.
//
// It's always recommended that clients should use exponential backoff when
// retrying.
//
// Clients should wait until `retry_delay` amount of time has passed since
// receiving the error response before retrying.  If retrying requests also
// fail, clients should use an exponential backoff scheme to gradually increase
// the delay between retries based on `retry_delay`, until either a maximum
// number of retries have been reached or a maximum retry delay cap has been
// reached.

export interface RetryInfo {
  '@type': 'type.googleapis.com/google.rpc.RetryInfo';
  // Clients should wait at least this long between retrying the same request.
  retryDelay: {
    nanos: number;
    seconds: number;
  };
}

// Describes additional debugging info.
export interface DebugInfo {
  '@type': 'type.googleapis.com/google.rpc.DebugInfo';
  // Additional debugging information provided by the server.
  detail: string;
  // The stack trace entries indicating where the error occurred.
  stackEntries: string[];
}

// Describes how a quota check failed.
//
// For example if a daily limit was exceeded for the calling project,
// a service could respond with a QuotaFailure detail containing the project
// id and the description of the quota limit that was exceeded.  If the
// calling project hasn't enabled the service in the developer console, then
// a service could respond with the project id and set `service_disabled`
// to true.
//
// Also see RetryDetail and Help types for other details about handling a
// quota failure.
export interface QuotaFailure {
  '@type': 'type.googleapis.com/google.rpc.QuotaFailure';
  violations: {
    // The subject on which the quota check failed.
    // For example, "clientip:<ip address of client>" or "project:<Google
    // developer project id>".
    subject: string;

    // A description of how the quota check failed. Clients can use this
    // description to find more about the quota configuration in the service's
    // public documentation, or find the relevant quota limit to adjust through
    // developer console.
    //
    // For example: "Service disabled" or "Daily Limit for read operations
    // exceeded".
    description: string;
  }[];
}

export interface ErrorInfo {
  '@type': 'type.googleapis.com/google.rpc.ErrorInfo';
  // The reason of the error. This is a constant value that identifies the
  // proximate cause of the error. Error reasons are unique within a particular
  // domain of errors. This should be at most 63 characters and match
  // /[A-Z0-9_]+/.
  reason: string;

  // The logical grouping to which the "reason" belongs. The error domain
  // is typically the registered service name of the tool or product that
  // generates the error. Example: "pubsub.googleapis.com". If the error is
  // generated by some common infrastructure, the error domain must be a
  // globally unique value that identifies the infrastructure. For Google API
  // infrastructure, the error domain is "googleapis.com".
  domain?: string;

  // Additional structured details about this error.
  //
  // Keys should match /[a-zA-Z0-9-_]/ and be limited to 64 characters in
  // length. When identifying the current value of an exceeded limit, the units
  // should be contained in the key, not the value.  For example, rather than
  // {"instanceLimit": "100/request"}, should be returned as,
  // {"instanceLimitPerRequest": "100"}, if the client exceeds the number of
  // instances that can be created in a single (batch) request.
  metadata?: Record<string, string>;
}

// Describes what preconditions have failed.
//
// For example, if an RPC failed because it required the Terms of Service to be
// acknowledged, it could list the terms of service violation in the
// PreconditionFailure message.
export interface PreconditionFailure {
  '@type': 'type.googleapis.com/google.rpc.PreconditionFailure';
  violations: {
    // The type of PreconditionFailure. We recommend using a service-specific
    // enum type to define the supported precondition violation types. For
    // example, "TOS" for "Terms of Service violation".
    type: string;

    // The subject, relative to the type, that failed.
    // For example, "google.com/cloud" relative to the "TOS" type would
    // indicate which terms of service is being referenced.
    subject: string;

    // A description of how the precondition failed. Developers can use this
    // description to understand how to fix the failure.
    //
    // For example: "Terms of service not accepted".
    description: string;
  }[];
}

// Describes violations in a client request. This error type focuses on the
// syntactic aspects of the request.
export interface BadRequest {
  '@type': 'type.googleapis.com/google.rpc.BadRequest';
  fieldViolations: {
    // A path leading to a field in the request body. The value will be a
    // sequence of dot-separated identifiers that identify a protocol buffer
    // field. E.g., "field_violations.field" would identify this field.
    field: string;

    // A description of why the request element is bad.
    description: string;
  }[];
}

// Contains metadata about the request that clients can attach when filing a bug
// or providing other forms of feedback.
export interface RequestInfo {
  '@type': 'type.googleapis.com/google.rpc.RequestInfo';
  // An opaque string that should only be interpreted by the service generating
  // it. For example, it can be used to identify requests in the service's logs.
  requestId: string;

  // Any data that was used to serve this request. For example, an encrypted
  // stack trace that can be sent back to the service provider for debugging.
  servingData?: string;
}

// Describes the resource that is being accessed.
export interface ResourceInfo {
  '@type': 'type.googleapis.com/google.rpc.ResourceInfo';
  // A name for the type of resource being accessed, e.g. "sql table",
  // "cloud storage bucket", "file", "Google calendar"; or the type URL
  // of the resource: e.g. "type.googleapis.com/google.pubsub.v1.Topic".
  resourceType: string;

  // The name of the resource being accessed.  For example, a shared calendar
  // name: "example.com_4fghdhgsrgh@group.calendar.google.com", if the current
  // error is
  // [google.rpc.Code.PERMISSION_DENIED][google.rpc.Code.PERMISSION_DENIED].
  resourceName: string;

  // The owner of the resource (optional).
  // For example, "user:<owner email>" or "project:<Google developer project
  // id>".
  owner?: string;

  // Describes what error is encountered when accessing this resource.
  // For example, updating a cloud project may require the `writer` permission
  // on the developer console project.
  description?: string;
}

// Provides links to documentation or for performing an out of band action.
//
// For example, if a quota check failed with an error indicating the calling
// project hasn't enabled the accessed service, this can contain a URL pointing
// directly to the right place in the developer console to flip the bit.
export interface Help {
  '@type': 'type.googleapis.com/google.rpc.Help';
  links: {
    // The URL of the link.
    url: string;

    // Describes what the link offers.
    description?: string;
  }[];
}

// Provides a localized error message that is safe to return to the user
// which can be attached to an RPC error.
export interface LocalizedMessage {
  '@type': 'type.googleapis.com/google.rpc.LocalizedMessage';
  // The locale used following the specification defined at
  // http://www.rfc-editor.org/rfc/bcp/bcp47.txt.
  // Examples are: "en-US", "fr-CH", "es-MX"
  locale: string;

  // The localized error message in the above locale.
  message: string;
}

export enum StatusCode {
  OK = 'OK', // = 0,

  // The operation was cancelled, typically by the caller.
  //
  // HTTP Mapping: 499 Client Closed Request
  CANCELLED = 'CANCELLED', // = 1,

  // Unknown error.  For example, this error may be returned when
  // a `Status` value received from another address space belongs to
  // an error space that is not known in this address space.  Also
  // errors raised by APIs that do not return enough error information
  // may be converted to this error.
  //
  // HTTP Mapping: 500 Internal Server Error
  UNKNOWN = 'UNKNOWN', // = 2,

  // The client specified an invalid argument.  Note that this differs
  // from `FAILED_PRECONDITION`.  `INVALID_ARGUMENT` indicates arguments
  // that are problematic regardless of the state of the system
  // (e.g., a malformed file name).
  //
  // HTTP Mapping: 400 Bad Request
  INVALID_ARGUMENT = 'INVALID_ARGUMENT', // = 3,

  // The deadline expired before the operation could complete. For operations
  // that change the state of the system, this error may be returned
  // even if the operation has completed successfully.  For example, a
  // successful response from a server could have been delayed long
  // enough for the deadline to expire.
  //
  // HTTP Mapping: 504 Gateway Timeout
  DEADLINE_EXCEEDED = 'DEADLINE_EXCEEDED', // = 4,

  // Some requested entity (e.g., file or directory) was not found.
  //
  // Note to server developers: if a request is denied for an entire class
  // of users, such as gradual feature rollout or undocumented whitelist,
  // `NOT_FOUND` may be used. If a request is denied for some users within
  // a class of users, such as user-based access control, `PERMISSION_DENIED`
  // must be used.
  //
  // HTTP Mapping: 404 Not Found
  NOT_FOUND = 'NOT_FOUND', // = 5,

  // The entity that a client attempted to create (e.g., file or directory)
  // already exists.
  //
  // HTTP Mapping: 409 Conflict
  ALREADY_EXISTS = 'ALREADY_EXISTS', // = 6,

  // The caller does not have permission to execute the specified
  // operation. `PERMISSION_DENIED` must not be used for rejections
  // caused by exhausting some resource (use `RESOURCE_EXHAUSTED`
  // instead for those errors). `PERMISSION_DENIED` must not be
  // used if the caller can not be identified (use `UNAUTHENTICATED`
  // instead for those errors). This error code does not imply the
  // request is valid or the requested entity exists or satisfies
  // other pre-conditions.
  //
  // HTTP Mapping: 403 Forbidden
  PERMISSION_DENIED = 'PERMISSION_DENIED', // = 7,

  // The request does not have valid authentication credentials for the
  // operation.
  //
  // HTTP Mapping: 401 Unauthorized
  UNAUTHENTICATED = 'UNAUTHENTICATED', // = 16,

  // Some resource has been exhausted, perhaps a per-user quota, or
  // perhaps the entire file system is out of space.
  //
  // HTTP Mapping: 429 Too Many Requests
  RESOURCE_EXHAUSTED = 'RESOURCE_EXHAUSTED', // = 8,

  // The operation was rejected because the system is not in a state
  // required for the operation's execution.  For example, the directory
  // to be deleted is non-empty, an rmdir operation is applied to
  // a non-directory, etc.
  //
  // Service implementors can use the following guidelines to decide
  // between `FAILED_PRECONDITION`, `ABORTED`, and `UNAVAILABLE`:
  //  (a) Use `UNAVAILABLE` if the client can retry just the failing call.
  //  (b) Use `ABORTED` if the client should retry at a higher level
  //      (e.g., when a client-specified test-and-set fails, indicating the
  //      client should restart a read-modify-write sequence).
  //  (c) Use `FAILED_PRECONDITION` if the client should not retry until
  //      the system state has been explicitly fixed.  E.g., if an "rmdir"
  //      fails because the directory is non-empty, `FAILED_PRECONDITION`
  //      should be returned since the client should not retry unless
  //      the files are deleted from the directory.
  //
  // HTTP Mapping: 400 Bad Request
  FAILED_PRECONDITION = 'FAILED_PRECONDITION', // = 9,

  // The operation was aborted, typically due to a concurrency issue such as
  // a sequencer check failure or transaction abort.
  //
  // See the guidelines above for deciding between `FAILED_PRECONDITION`,
  // `ABORTED`, and `UNAVAILABLE`.
  //
  // HTTP Mapping: 409 Conflict
  ABORTED = 'ABORTED', // = 10,

  // The operation was attempted past the valid range.  E.g., seeking or
  // reading past end-of-file.
  //
  // Unlike `INVALID_ARGUMENT`, this error indicates a problem that may
  // be fixed if the system state changes. For example, a 32-bit file
  // system will generate `INVALID_ARGUMENT` if asked to read at an
  // offset that is not in the range [0,2^32-1], but it will generate
  // `OUT_OF_RANGE` if asked to read from an offset past the current
  // file size.
  //
  // There is a fair bit of overlap between `FAILED_PRECONDITION` and
  // `OUT_OF_RANGE`.  We recommend using `OUT_OF_RANGE` (the more specific
  // error) when it applies so that callers who are iterating through
  // a space can easily look for an `OUT_OF_RANGE` error to detect when
  // they are done.
  //
  // HTTP Mapping: 400 Bad Request
  OUT_OF_RANGE = 'OUT_OF_RANGE', // = 11,

  // The operation is not implemented or is not supported/enabled in this
  // service.
  //
  // HTTP Mapping: 501 Not Implemented
  UNIMPLEMENTED = 'UNIMPLEMENTED', // = 12,

  // Internal errors.  This means that some invariants expected by the
  // underlying system have been broken.  This error code is reserved
  // for serious errors.
  //
  // HTTP Mapping: 500 Internal Server Error
  INTERNAL = 'INTERNAL', // = 13,

  // The service is currently unavailable.  This is most likely a
  // transient condition, which can be corrected by retrying with
  // a backoff.
  //
  // See the guidelines above for deciding between `FAILED_PRECONDITION`,
  // `ABORTED`, and `UNAVAILABLE`.
  //
  // HTTP Mapping: 503 Service Unavailable
  UNAVAILABLE = 'UNAVAILABLE', // = 14,

  // Unrecoverable data loss or corruption.
  //
  // HTTP Mapping: 500 Internal Server Error
  DATA_LOSS = 'DATA_LOSS', // = 15,
  // The 422 (Unprocessable Entity) status code means the server
  // understands the content type of the request entity (hence a 415(Unsupported Media Type)
  // status code is inappropriate), and the syntax of the request entity is correct
  // (thus a 400 (Bad Request) status code is inappropriate) but was unable to process the contained instructions.
  // For example, this error condition may occur if an XML request body contains well-formed (i.e., syntactically correct),
  // but semantically erroneous, XML instructions.
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
}

// https://cloud.google.com/apis/design/errors#error_details
export interface ApiError {
  // This message has the same semantics as `google.rpc.Status`. It uses HTTP
  // status code instead of gRPC status code. It has an extra field `status`
  // for backward compatibility with Google API Client Libraries.
  error: {
    // The HTTP status code that corresponds to `google.rpc.Status.code`.
    code: number;
    status: StatusCode;

    // A developer-facing error message, which should be in English. Any
    // user-facing error message should be localized and sent in the
    // details field, or localized by the client.
    message: string;

    // A list of messages that carry the error details.
    details: (
      | RetryInfo
      | DebugInfo
      | QuotaFailure
      | ErrorInfo
      | PreconditionFailure
      | BadRequest
      | RequestInfo
      | ResourceInfo
      | Help
      | LocalizedMessage
    )[];
  };
}
