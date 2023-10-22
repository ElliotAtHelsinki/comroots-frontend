import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type Cv = {
  __typename?: 'CV';
  filename: Scalars['String'];
  id: Scalars['Int'];
  key: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']>;
};

export type Comment = {
  __typename?: 'Comment';
  createdAt?: Maybe<Scalars['String']>;
  creator?: Maybe<User>;
  creatorId?: Maybe<Scalars['Int']>;
  creatorType: Scalars['String'];
  id: Scalars['Int'];
  pageCreator?: Maybe<Page>;
  pageCreatorId?: Maybe<Scalars['Int']>;
  points: Scalars['Int'];
  postId?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  voteStatus?: Maybe<Scalars['Int']>;
};

export type Conversation = {
  __typename?: 'Conversation';
  firestoreCollectionId: Scalars['String'];
  id: Scalars['Int'];
  participants: Array<Scalars['Int']>;
};

export type ConversationInFirestore = {
  __typename?: 'ConversationInFirestore';
  id: Scalars['String'];
};

export type CreateConversationResponse = {
  __typename?: 'CreateConversationResponse';
  conversation?: Maybe<ConversationInFirestore>;
  errors?: Maybe<Array<FieldError>>;
};

export type EducationItem = {
  __typename?: 'EducationItem';
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  photo?: Maybe<Scalars['String']>;
  photoUrl?: Maybe<Scalars['String']>;
  school: Scalars['String'];
  startDate?: Maybe<Scalars['DateTime']>;
  status?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']>;
};

export type EducationItemInput = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  photo?: InputMaybe<Scalars['Upload']>;
  school?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<Scalars['String']>;
};

export type EducationItemResponse = {
  __typename?: 'EducationItemResponse';
  educationItem?: Maybe<EducationItem>;
  errors?: Maybe<Array<FieldError>>;
};

export type Experience = {
  __typename?: 'Experience';
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  photo?: Maybe<Scalars['String']>;
  photoUrl?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['DateTime']>;
  title: Scalars['String'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']>;
  workplace?: Maybe<Scalars['String']>;
};

export type ExperienceInput = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  photo?: InputMaybe<Scalars['Upload']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
  workplace?: InputMaybe<Scalars['String']>;
};

export type ExperienceResponse = {
  __typename?: 'ExperienceResponse';
  errors?: Maybe<Array<FieldError>>;
  experience?: Maybe<Experience>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  errors?: Maybe<Array<FieldError>>;
  success: Scalars['Boolean'];
};

export type InboxResponse = {
  __typename?: 'InboxResponse';
  firestoreCollectionId: Scalars['String'];
  partner: User;
};

export type Location = {
  latitude?: InputMaybe<Scalars['Float']>;
  longtitude?: InputMaybe<Scalars['Float']>;
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  senderId: Scalars['Int'];
  type: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type MessageInput = {
  text?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
  upload?: InputMaybe<Scalars['Upload']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  apply: OfferApplication;
  changeAvatar: Scalars['Boolean'];
  changeCoverPhoto: Scalars['Boolean'];
  changePageAvatar: Scalars['Boolean'];
  changePageCoverPhoto: Scalars['Boolean'];
  changePassword: UserResponse;
  changeSpaceAvatar: Scalars['Boolean'];
  changeSpaceCoverPhoto: Scalars['Boolean'];
  createComment: Comment;
  createConversation: CreateConversationResponse;
  createEducationItem: EducationItemResponse;
  createExperience: ExperienceResponse;
  createMessage: Message;
  createOffer: OfferResponse;
  createPage: PageResponse;
  createPost: PostResponse;
  createQualification: QualificationResponse;
  createSpace: SpaceResponse;
  deleteCV: Scalars['Boolean'];
  deleteComment: Scalars['Boolean'];
  deleteConversation: Scalars['Boolean'];
  deleteEducationItem: Scalars['Boolean'];
  deleteExperience: Scalars['Boolean'];
  deleteMessage: Scalars['Boolean'];
  deleteOffer?: Maybe<Scalars['Boolean']>;
  deleteOfferApplication: Scalars['Boolean'];
  deletePage: Scalars['Boolean'];
  deletePost?: Maybe<Scalars['Boolean']>;
  deleteQualification: Scalars['Boolean'];
  deleteSpace: Scalars['Boolean'];
  deleteSpaceAvatar: Scalars['Boolean'];
  deleteSpaceCoverPhoto: Scalars['Boolean'];
  deleteUser?: Maybe<Scalars['Boolean']>;
  follow: Scalars['Boolean'];
  followUser: Scalars['Boolean'];
  forgotPassword: ForgotPasswordResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  setSkills?: Maybe<Array<Scalars['String']>>;
  subscribe: Scalars['Boolean'];
  triggerOffersInvalidate: Scalars['Boolean'];
  triggerPostsInvalidate: Scalars['Boolean'];
  unfollow: Scalars['Boolean'];
  unfollowUser: Scalars['Boolean'];
  unsubscribe: Scalars['Boolean'];
  updateApplicationStatus: OfferApplication;
  updateComment?: Maybe<Comment>;
  updateEducationItem: EducationItemResponse;
  updateExperience: ExperienceResponse;
  updateInfo: Scalars['Boolean'];
  updateOffer?: Maybe<Offer>;
  updatePageInfo: Scalars['Boolean'];
  updatePost?: Maybe<PostResponse>;
  updateQualification: QualificationResponse;
  updateSpaceInfo: Scalars['Boolean'];
  uploadAvatar?: Maybe<UploadedFileResponse>;
  uploadCV?: Maybe<UploadedFileResponse>;
  uploadCoverPhoto?: Maybe<UploadedFileResponse>;
  uploadPageAvatar?: Maybe<UploadedFileResponse>;
  uploadPageCoverPhoto?: Maybe<UploadedFileResponse>;
  uploadSpaceAvatar?: Maybe<UploadedFileResponse>;
  uploadSpaceCoverPhoto?: Maybe<UploadedFileResponse>;
  vote: Scalars['Boolean'];
  voteComment: Scalars['Boolean'];
};


export type MutationApplyArgs = {
  offerId: Scalars['Int'];
};


export type MutationChangeAvatarArgs = {
  key: Scalars['String'];
};


export type MutationChangeCoverPhotoArgs = {
  key: Scalars['String'];
};


export type MutationChangePageAvatarArgs = {
  key: Scalars['String'];
  pageId: Scalars['Int'];
};


export type MutationChangePageCoverPhotoArgs = {
  key: Scalars['String'];
  pageId: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationChangeSpaceAvatarArgs = {
  key: Scalars['String'];
  spaceId: Scalars['Int'];
};


export type MutationChangeSpaceCoverPhotoArgs = {
  key: Scalars['String'];
  spaceId: Scalars['Int'];
};


export type MutationCreateCommentArgs = {
  pageId?: InputMaybe<Scalars['Int']>;
  postId: Scalars['Int'];
  text: Scalars['String'];
};


export type MutationCreateConversationArgs = {
  partnerUsername: Scalars['String'];
};


export type MutationCreateEducationItemArgs = {
  input: EducationItemInput;
};


export type MutationCreateExperienceArgs = {
  input: ExperienceInput;
};


export type MutationCreateMessageArgs = {
  firestoreCollectionId: Scalars['String'];
  input: MessageInput;
};


export type MutationCreateOfferArgs = {
  input: OfferInputCreate;
};


export type MutationCreatePageArgs = {
  pageName: Scalars['String'];
};


export type MutationCreatePostArgs = {
  input: PostInputCreate;
};


export type MutationCreateQualificationArgs = {
  input: QualificationInput;
};


export type MutationCreateSpaceArgs = {
  spaceName: Scalars['String'];
};


export type MutationDeleteCvArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteConversationArgs = {
  firestoreCollectionId: Scalars['String'];
};


export type MutationDeleteEducationItemArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteExperienceArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteMessageArgs = {
  firestoreCollectionId: Scalars['String'];
  messageDocumentId: Scalars['String'];
};


export type MutationDeleteOfferArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteOfferApplicationArgs = {
  offerId: Scalars['Int'];
};


export type MutationDeletePageArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteQualificationArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteSpaceArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteSpaceAvatarArgs = {
  key: Scalars['String'];
};


export type MutationDeleteSpaceCoverPhotoArgs = {
  key: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationFollowArgs = {
  pageId: Scalars['Int'];
};


export type MutationFollowUserArgs = {
  id: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  emailOrUsername: Scalars['String'];
  location?: InputMaybe<Location>;
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  location?: InputMaybe<Location>;
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationSetSkillsArgs = {
  skills: Array<Scalars['String']>;
};


export type MutationSubscribeArgs = {
  spaceId: Scalars['Int'];
};


export type MutationUnfollowArgs = {
  pageId: Scalars['Int'];
};


export type MutationUnfollowUserArgs = {
  id: Scalars['Int'];
};


export type MutationUnsubscribeArgs = {
  spaceId: Scalars['Int'];
};


export type MutationUpdateApplicationStatusArgs = {
  id: Scalars['Int'];
  status: Scalars['String'];
};


export type MutationUpdateCommentArgs = {
  id: Scalars['Int'];
  text: Scalars['String'];
};


export type MutationUpdateEducationItemArgs = {
  id: Scalars['Int'];
  input: EducationItemInput;
};


export type MutationUpdateExperienceArgs = {
  id: Scalars['Int'];
  input: ExperienceInput;
};


export type MutationUpdateInfoArgs = {
  input: UserInfo;
};


export type MutationUpdateOfferArgs = {
  id: Scalars['Int'];
  input: OfferInputUpdate;
};


export type MutationUpdatePageInfoArgs = {
  id: Scalars['Int'];
  input: PageInfo;
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int'];
  input: PostInputUpdate;
};


export type MutationUpdateQualificationArgs = {
  id: Scalars['Int'];
  input: QualificationInput;
};


export type MutationUpdateSpaceInfoArgs = {
  id: Scalars['Int'];
  input: SpaceInfo;
};


export type MutationUploadAvatarArgs = {
  upload: Scalars['Upload'];
};


export type MutationUploadCvArgs = {
  upload: Scalars['Upload'];
};


export type MutationUploadCoverPhotoArgs = {
  upload: Scalars['Upload'];
};


export type MutationUploadPageAvatarArgs = {
  pageId: Scalars['Int'];
  upload: Scalars['Upload'];
};


export type MutationUploadPageCoverPhotoArgs = {
  pageId: Scalars['Int'];
  upload: Scalars['Upload'];
};


export type MutationUploadSpaceAvatarArgs = {
  spaceId: Scalars['Int'];
  upload: Scalars['Upload'];
};


export type MutationUploadSpaceCoverPhotoArgs = {
  spaceId: Scalars['Int'];
  upload: Scalars['Upload'];
};


export type MutationVoteArgs = {
  postId: Scalars['Int'];
  value: Scalars['Int'];
};


export type MutationVoteCommentArgs = {
  commentId: Scalars['Int'];
  value: Scalars['Int'];
};

export type Offer = {
  __typename?: 'Offer';
  address?: Maybe<Scalars['String']>;
  applicantsNo: Scalars['Int'];
  applicationStatus?: Maybe<Scalars['String']>;
  applications?: Maybe<Array<OfferApplication>>;
  applicationsNo?: Maybe<Scalars['Int']>;
  benefits?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  creator?: Maybe<User>;
  creatorId?: Maybe<Scalars['Int']>;
  creatorType?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  employmentType?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  pageCreator?: Maybe<Page>;
  pageCreatorId?: Maybe<Scalars['Int']>;
  photo?: Maybe<Scalars['String']>;
  photoUrl?: Maybe<Scalars['String']>;
  recruiting?: Maybe<Scalars['Boolean']>;
  requirements?: Maybe<Scalars['String']>;
  salaryRange?: Maybe<Scalars['String']>;
  space?: Maybe<Space>;
  spaceId: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  workplace?: Maybe<Scalars['String']>;
};

export type OfferApplication = {
  __typename?: 'OfferApplication';
  id: Scalars['Int'];
  offer: Offer;
  offerId: Scalars['Int'];
  status: Scalars['String'];
  user: User;
  userId: Scalars['Int'];
};

export type OfferInputCreate = {
  address?: InputMaybe<Scalars['String']>;
  benefits?: InputMaybe<Scalars['String']>;
  department?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  employmentType?: InputMaybe<Scalars['String']>;
  pageId?: InputMaybe<Scalars['Int']>;
  photo?: InputMaybe<Scalars['Upload']>;
  recruiting?: InputMaybe<Scalars['Boolean']>;
  requirements?: InputMaybe<Scalars['String']>;
  salaryRange?: InputMaybe<Scalars['String']>;
  spaceName?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  workplace?: InputMaybe<Scalars['String']>;
};

export type OfferInputUpdate = {
  address?: InputMaybe<Scalars['String']>;
  benefits?: InputMaybe<Scalars['String']>;
  department?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  employmentType?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['Upload']>;
  recruiting?: InputMaybe<Scalars['Boolean']>;
  requirements?: InputMaybe<Scalars['String']>;
  salaryRange?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  workplace?: InputMaybe<Scalars['String']>;
};

export type OfferResponse = {
  __typename?: 'OfferResponse';
  errors?: Maybe<Array<FieldError>>;
  offer?: Maybe<Offer>;
};

export type Page = {
  __typename?: 'Page';
  about?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Comment>>;
  coverPhoto?: Maybe<Scalars['String']>;
  coverPhotoUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  followStatus?: Maybe<Scalars['Boolean']>;
  followerNumber: Scalars['Int'];
  fullPageName?: Maybe<Scalars['String']>;
  headline?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  ownerStatus?: Maybe<Scalars['Boolean']>;
  owners?: Maybe<Array<User>>;
  pageName: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};


export type PageFollowStatusArgs = {
  pageId?: InputMaybe<Scalars['Int']>;
};

export type PageInfo = {
  about?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
  fullPageName?: InputMaybe<Scalars['String']>;
  headline?: InputMaybe<Scalars['String']>;
};

export type PageResponse = {
  __typename?: 'PageResponse';
  errors?: Maybe<Array<FieldError>>;
  page?: Maybe<Page>;
};

export type PaginatedComments = {
  __typename?: 'PaginatedComments';
  comments: Array<Comment>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedOffers = {
  __typename?: 'PaginatedOffers';
  hasMore: Scalars['Boolean'];
  offers: Array<Offer>;
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  hasMore: Scalars['Boolean'];
  posts: Array<Post>;
};

export type PhotoResponse = {
  __typename?: 'PhotoResponse';
  key?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  creator?: Maybe<User>;
  creatorId?: Maybe<Scalars['Int']>;
  creatorType: Scalars['String'];
  id: Scalars['Int'];
  pageCreator?: Maybe<Page>;
  pageCreatorId?: Maybe<Scalars['Int']>;
  points: Scalars['Int'];
  space: Space;
  spaceId: Scalars['Int'];
  tags?: Maybe<Array<Tag>>;
  text: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  voteStatus?: Maybe<Scalars['Int']>;
};

export type PostInputCreate = {
  pageId?: InputMaybe<Scalars['Int']>;
  spaceName?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['Int']>>;
  text?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type PostInputUpdate = {
  tags?: InputMaybe<Array<Scalars['Int']>>;
  text?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
};

export type Qualification = {
  __typename?: 'Qualification';
  credentialID?: Maybe<Scalars['String']>;
  credentialURL?: Maybe<Scalars['String']>;
  expirationDate?: Maybe<Scalars['DateTime']>;
  expire: Scalars['Boolean'];
  id: Scalars['Int'];
  issuanceDate?: Maybe<Scalars['DateTime']>;
  issuingOrganisation: Scalars['String'];
  name: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  photoUrl?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']>;
};

export type QualificationInput = {
  credentialID?: InputMaybe<Scalars['String']>;
  credentialURL?: InputMaybe<Scalars['String']>;
  expirationDate?: InputMaybe<Scalars['DateTime']>;
  expire: Scalars['Boolean'];
  issuanceDate?: InputMaybe<Scalars['DateTime']>;
  issuingOrganisation: Scalars['String'];
  name: Scalars['String'];
  photo?: InputMaybe<Scalars['Upload']>;
};

export type QualificationResponse = {
  __typename?: 'QualificationResponse';
  errors?: Maybe<Array<FieldError>>;
  qualification?: Maybe<Qualification>;
};

export type Query = {
  __typename?: 'Query';
  appliedOffers: Array<Offer>;
  avatarUrl?: Maybe<Scalars['String']>;
  avatars: Array<PhotoResponse>;
  comments: PaginatedComments;
  conversations: Array<Conversation>;
  coverPhotoUrl?: Maybe<Scalars['String']>;
  coverPhotos: Array<PhotoResponse>;
  cvs?: Maybe<Array<Cv>>;
  educationItems: Array<EducationItem>;
  embedUrl: Scalars['String'];
  experiences: Array<Experience>;
  followStatus?: Maybe<Scalars['Boolean']>;
  getSignedUrl?: Maybe<Scalars['String']>;
  getSignedUrls: Array<Scalars['String']>;
  inboxes: Array<InboxResponse>;
  me?: Maybe<User>;
  myPages: Array<Page>;
  mySpaces: Array<Space>;
  offer?: Maybe<Offer>;
  offers: PaginatedOffers;
  page: Page;
  pageAvatars: Array<PhotoResponse>;
  pageCoverPhotos: Array<PhotoResponse>;
  participants: Array<User>;
  post?: Maybe<Post>;
  posts: PaginatedPosts;
  qualifications: Array<Qualification>;
  space?: Maybe<Space>;
  spaceAvatars: Array<PhotoResponse>;
  spaceCoverPhotos: Array<PhotoResponse>;
  subscriptionStatus?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Array<Tag>>;
  user?: Maybe<User>;
  userFollowStatus?: Maybe<Scalars['Boolean']>;
};


export type QueryCommentsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  postId: Scalars['Int'];
};


export type QueryCvsArgs = {
  userId: Scalars['Int'];
};


export type QueryEducationItemsArgs = {
  userId: Scalars['Int'];
};


export type QueryExperiencesArgs = {
  userId: Scalars['Int'];
};


export type QueryFollowStatusArgs = {
  pageId?: InputMaybe<Scalars['Int']>;
};


export type QueryGetSignedUrlArgs = {
  key: Scalars['String'];
};


export type QueryGetSignedUrlsArgs = {
  keys: Array<Scalars['String']>;
};


export type QueryInboxesArgs = {
  firestoreCollectionIds: Array<Scalars['String']>;
};


export type QueryOfferArgs = {
  id: Scalars['Int'];
};


export type QueryOffersArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  pageId?: InputMaybe<Scalars['Int']>;
  spaceId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};


export type QueryPageArgs = {
  pageName: Scalars['String'];
};


export type QueryPageAvatarsArgs = {
  pageId: Scalars['Int'];
};


export type QueryPageCoverPhotosArgs = {
  pageId: Scalars['Int'];
};


export type QueryParticipantsArgs = {
  firestoreCollectionId: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  pageId?: InputMaybe<Scalars['Int']>;
  spaceId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};


export type QueryQualificationsArgs = {
  userId: Scalars['Int'];
};


export type QuerySpaceArgs = {
  spaceName: Scalars['String'];
};


export type QuerySpaceAvatarsArgs = {
  spaceId: Scalars['Int'];
};


export type QuerySpaceCoverPhotosArgs = {
  spaceId: Scalars['Int'];
};


export type QuerySubscriptionStatusArgs = {
  spaceId?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  username: Scalars['String'];
};


export type QueryUserFollowStatusArgs = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Space = {
  __typename?: 'Space';
  about?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  coverPhoto?: Maybe<Scalars['String']>;
  coverPhotoUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  fullSpaceName?: Maybe<Scalars['String']>;
  headline?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  modStatus: Scalars['Boolean'];
  mods?: Maybe<Array<User>>;
  rules?: Maybe<Scalars['String']>;
  spaceName: Scalars['String'];
  subscriberNumber: Scalars['Int'];
  subscriptionStatus?: Maybe<Scalars['Boolean']>;
  updatedAt: Scalars['String'];
};


export type SpaceSubscriptionStatusArgs = {
  spaceId?: InputMaybe<Scalars['Int']>;
};

export type SpaceInfo = {
  about?: InputMaybe<Scalars['String']>;
  fullSpaceName?: InputMaybe<Scalars['String']>;
  headline?: InputMaybe<Scalars['String']>;
  rules?: InputMaybe<Scalars['String']>;
};

export type SpaceResponse = {
  __typename?: 'SpaceResponse';
  errors?: Maybe<Array<FieldError>>;
  space?: Maybe<Space>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type UploadedFileResponse = {
  __typename?: 'UploadedFileResponse';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  url: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  about?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  applications?: Maybe<Array<OfferApplication>>;
  avatar?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Comment>>;
  coverPhoto?: Maybe<Scalars['String']>;
  coverPhotoUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  followerNumber: Scalars['Int'];
  followingNumber: Scalars['Int'];
  fullName?: Maybe<Scalars['String']>;
  headline?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  mostRecentLatitude?: Maybe<Scalars['Float']>;
  mostRecentLongtitude?: Maybe<Scalars['Float']>;
  skills?: Maybe<Array<Scalars['String']>>;
  updatedAt?: Maybe<Scalars['String']>;
  userFollowStatus?: Maybe<Scalars['Boolean']>;
  username: Scalars['String'];
};


export type UserUserFollowStatusArgs = {
  id?: InputMaybe<Scalars['Int']>;
};

export type UserInfo = {
  about?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  headline?: InputMaybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularCommentFragment = { __typename?: 'Comment', id: number, createdAt?: string | null, updatedAt?: string | null, text: string, creatorType: string, points: number, voteStatus?: number | null, creator?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null, pageCreator?: { __typename?: 'Page', id: number, createdAt?: string | null, updatedAt?: string | null, avatar?: string | null, coverPhoto?: string | null, pageName: string, followStatus?: boolean | null, ownerStatus?: boolean | null, fullPageName?: string | null, headline?: string | null, address?: string | null, about?: string | null, followerNumber: number, owners?: Array<{ __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null }> | null } | null };

export type RegularCreatePostResponseFragment = { __typename?: 'PostResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, post?: { __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, text: string, points: number, voteStatus?: number | null, creatorType: string, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null, creator?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null, pageCreator?: { __typename?: 'Page', id: number, createdAt?: string | null, updatedAt?: string | null, avatar?: string | null, coverPhoto?: string | null, pageName: string, followStatus?: boolean | null, ownerStatus?: boolean | null, fullPageName?: string | null, headline?: string | null, address?: string | null, about?: string | null, followerNumber: number, owners?: Array<{ __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null }> | null } | null, space: { __typename?: 'Space', id: number, createdAt: string, updatedAt: string, spaceName: string, subscriptionStatus?: boolean | null, modStatus: boolean, avatar?: string | null, coverPhoto?: string | null, subscriberNumber: number, fullSpaceName?: string | null, headline?: string | null, rules?: string | null, about?: string | null } } | null };

export type RegularEducationItemFragment = { __typename?: 'EducationItem', id: number, school: string, status?: string | null, startDate?: any | null, endDate?: any | null, photo?: string | null, photoUrl?: string | null };

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularExperienceFragment = { __typename?: 'Experience', id: number, title: string, workplace?: string | null, startDate?: any | null, endDate?: any | null, photo?: string | null, photoUrl?: string | null };

export type RegularFileFragment = { __typename?: 'UploadedFileResponse', filename: string, mimetype: string, encoding: string, url: string };

export type RegularMessageFragment = { __typename?: 'Message', id: string, createdAt: string, updatedAt: string, type: string, content: string, senderId: number };

export type RegularOfferFragment = { __typename?: 'Offer', id: number, createdAt: string, updatedAt: string, title: string, workplace?: string | null, address?: string | null, recruiting?: boolean | null, employmentType?: string | null, salaryRange?: string | null, department?: string | null, requirements?: string | null, benefits?: string | null, description?: string | null, applicantsNo: number, applicationStatus?: string | null, creatorType?: string | null, photo?: string | null, photoUrl?: string | null, creator?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null, pageCreator?: { __typename?: 'Page', id: number, createdAt?: string | null, updatedAt?: string | null, avatar?: string | null, coverPhoto?: string | null, pageName: string, followStatus?: boolean | null, ownerStatus?: boolean | null, fullPageName?: string | null, headline?: string | null, address?: string | null, about?: string | null, followerNumber: number, owners?: Array<{ __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null }> | null } | null, space?: { __typename?: 'Space', id: number, createdAt: string, updatedAt: string, spaceName: string, subscriptionStatus?: boolean | null, modStatus: boolean, avatar?: string | null, coverPhoto?: string | null, subscriberNumber: number, fullSpaceName?: string | null, headline?: string | null, rules?: string | null, about?: string | null } | null };

export type RegularOfferApplicationFragment = { __typename?: 'OfferApplication', id: number, userId: number, offerId: number, status: string };

export type RegularPageFragment = { __typename?: 'Page', id: number, createdAt?: string | null, updatedAt?: string | null, avatar?: string | null, coverPhoto?: string | null, pageName: string, followStatus?: boolean | null, ownerStatus?: boolean | null, fullPageName?: string | null, headline?: string | null, address?: string | null, about?: string | null, followerNumber: number, owners?: Array<{ __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null }> | null };

export type RegularPhotoResponseFragment = { __typename?: 'PhotoResponse', key?: string | null, url?: string | null };

export type RegularPostFragment = { __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, text: string, points: number, voteStatus?: number | null, creatorType: string, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null, creator?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null, pageCreator?: { __typename?: 'Page', id: number, createdAt?: string | null, updatedAt?: string | null, avatar?: string | null, coverPhoto?: string | null, pageName: string, followStatus?: boolean | null, ownerStatus?: boolean | null, fullPageName?: string | null, headline?: string | null, address?: string | null, about?: string | null, followerNumber: number, owners?: Array<{ __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null }> | null } | null, space: { __typename?: 'Space', id: number, createdAt: string, updatedAt: string, spaceName: string, subscriptionStatus?: boolean | null, modStatus: boolean, avatar?: string | null, coverPhoto?: string | null, subscriberNumber: number, fullSpaceName?: string | null, headline?: string | null, rules?: string | null, about?: string | null } };

export type RegularQualificationFragment = { __typename?: 'Qualification', id: number, name: string, issuingOrganisation: string, issuanceDate?: any | null, expire: boolean, expirationDate?: any | null, credentialID?: string | null, credentialURL?: string | null, photo?: string | null, photoUrl?: string | null };

export type RegularSpaceFragment = { __typename?: 'Space', id: number, createdAt: string, updatedAt: string, spaceName: string, subscriptionStatus?: boolean | null, modStatus: boolean, avatar?: string | null, coverPhoto?: string | null, subscriberNumber: number, fullSpaceName?: string | null, headline?: string | null, rules?: string | null, about?: string | null };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null };

export type ApplyMutationVariables = Exact<{
  offerId: Scalars['Int'];
}>;


export type ApplyMutation = { __typename?: 'Mutation', apply: { __typename?: 'OfferApplication', id: number, userId: number, offerId: number, status: string } };

export type ChangeAvatarMutationVariables = Exact<{
  key: Scalars['String'];
}>;


export type ChangeAvatarMutation = { __typename?: 'Mutation', changeAvatar: boolean };

export type ChangeCoverPhotoMutationVariables = Exact<{
  key: Scalars['String'];
}>;


export type ChangeCoverPhotoMutation = { __typename?: 'Mutation', changeCoverPhoto: boolean };

export type ChangePageAvatarMutationVariables = Exact<{
  key: Scalars['String'];
  pageId: Scalars['Int'];
}>;


export type ChangePageAvatarMutation = { __typename?: 'Mutation', changePageAvatar: boolean };

export type ChangePageCoverPhotoMutationVariables = Exact<{
  key: Scalars['String'];
  pageId: Scalars['Int'];
}>;


export type ChangePageCoverPhotoMutation = { __typename?: 'Mutation', changePageCoverPhoto: boolean };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null } };

export type ChangeSpaceAvatarMutationVariables = Exact<{
  key: Scalars['String'];
  spaceId: Scalars['Int'];
}>;


export type ChangeSpaceAvatarMutation = { __typename?: 'Mutation', changeSpaceAvatar: boolean };

export type ChangeSpaceCoverPhotoMutationVariables = Exact<{
  key: Scalars['String'];
  spaceId: Scalars['Int'];
}>;


export type ChangeSpaceCoverPhotoMutation = { __typename?: 'Mutation', changeSpaceCoverPhoto: boolean };

export type CreateCommentMutationVariables = Exact<{
  postId: Scalars['Int'];
  text: Scalars['String'];
  pageId?: InputMaybe<Scalars['Int']>;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: number, createdAt?: string | null, updatedAt?: string | null, text: string, creatorType: string, points: number, voteStatus?: number | null, creator?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null, pageCreator?: { __typename?: 'Page', id: number, createdAt?: string | null, updatedAt?: string | null, avatar?: string | null, coverPhoto?: string | null, pageName: string, followStatus?: boolean | null, ownerStatus?: boolean | null, fullPageName?: string | null, headline?: string | null, address?: string | null, about?: string | null, followerNumber: number, owners?: Array<{ __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null }> | null } | null } };

export type CreateConversationMutationVariables = Exact<{
  partnerUsername: Scalars['String'];
}>;


export type CreateConversationMutation = { __typename?: 'Mutation', createConversation: { __typename?: 'CreateConversationResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, conversation?: { __typename?: 'ConversationInFirestore', id: string } | null } };

export type CreateEducationItemMutationVariables = Exact<{
  input: EducationItemInput;
}>;


export type CreateEducationItemMutation = { __typename?: 'Mutation', createEducationItem: { __typename?: 'EducationItemResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, educationItem?: { __typename?: 'EducationItem', id: number, school: string, status?: string | null, startDate?: any | null, endDate?: any | null, photo?: string | null, photoUrl?: string | null } | null } };

export type CreateExperienceMutationVariables = Exact<{
  input: ExperienceInput;
}>;


export type CreateExperienceMutation = { __typename?: 'Mutation', createExperience: { __typename?: 'ExperienceResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, experience?: { __typename?: 'Experience', id: number, title: string, workplace?: string | null, startDate?: any | null, endDate?: any | null, photo?: string | null, photoUrl?: string | null } | null } };

export type CreateMessageMutationVariables = Exact<{
  input: MessageInput;
  firestoreCollectionId: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', id: string, createdAt: string, updatedAt: string, type: string, content: string, senderId: number } };

export type CreateOfferMutationVariables = Exact<{
  input: OfferInputCreate;
}>;


export type CreateOfferMutation = { __typename?: 'Mutation', createOffer: { __typename?: 'OfferResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, offer?: { __typename?: 'Offer', id: number, createdAt: string, updatedAt: string, title: string, workplace?: string | null, address?: string | null, recruiting?: boolean | null, employmentType?: string | null, salaryRange?: string | null, department?: string | null, requirements?: string | null, benefits?: string | null, description?: string | null, applicantsNo: number, applicationStatus?: string | null, creatorType?: string | null, photo?: string | null, photoUrl?: string | null, creator?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null, pageCreator?: { __typename?: 'Page', id: number, createdAt?: string | null, updatedAt?: string | null, avatar?: string | null, coverPhoto?: string | null, pageName: string, followStatus?: boolean | null, ownerStatus?: boolean | null, fullPageName?: string | null, headline?: string | null, address?: string | null, about?: string | null, followerNumber: number, owners?: Array<{ __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null }> | null } | null, space?: { __typename?: 'Space', id: number, createdAt: string, updatedAt: string, spaceName: string, subscriptionStatus?: boolean | null, modStatus: boolean, avatar?: string | null, coverPhoto?: string | null, subscriberNumber: number, fullSpaceName?: string | null, headline?: string | null, rules?: string | null, about?: string | null } | null } | null } };

export type CreatePageMutationVariables = Exact<{
  pageName: Scalars['String'];
}>;


export type CreatePageMutation = { __typename?: 'Mutation', createPage: { __typename?: 'PageResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, page?: { __typename?: 'Page', id: number, createdAt?: string | null, updatedAt?: string | null, avatar?: string | null, coverPhoto?: string | null, pageName: string, followStatus?: boolean | null, ownerStatus?: boolean | null, fullPageName?: string | null, headline?: string | null, address?: string | null, about?: string | null, followerNumber: number, owners?: Array<{ __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null }> | null } | null } };

export type CreatePostMutationVariables = Exact<{
  input: PostInputCreate;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, post?: { __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, text: string, points: number, voteStatus?: number | null, creatorType: string, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null, creator?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null, pageCreator?: { __typename?: 'Page', id: number, createdAt?: string | null, updatedAt?: string | null, avatar?: string | null, coverPhoto?: string | null, pageName: string, followStatus?: boolean | null, ownerStatus?: boolean | null, fullPageName?: string | null, headline?: string | null, address?: string | null, about?: string | null, followerNumber: number, owners?: Array<{ __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null }> | null } | null, space: { __typename?: 'Space', id: number, createdAt: string, updatedAt: string, spaceName: string, subscriptionStatus?: boolean | null, modStatus: boolean, avatar?: string | null, coverPhoto?: string | null, subscriberNumber: number, fullSpaceName?: string | null, headline?: string | null, rules?: string | null, about?: string | null } } | null } };

export type CreateQualificationMutationVariables = Exact<{
  input: QualificationInput;
}>;


export type CreateQualificationMutation = { __typename?: 'Mutation', createQualification: { __typename?: 'QualificationResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, qualification?: { __typename?: 'Qualification', id: number, name: string, issuingOrganisation: string, issuanceDate?: any | null, expire: boolean, expirationDate?: any | null, credentialID?: string | null, credentialURL?: string | null, photo?: string | null, photoUrl?: string | null } | null } };

export type CreateSpaceMutationVariables = Exact<{
  spaceName: Scalars['String'];
}>;


export type CreateSpaceMutation = { __typename?: 'Mutation', createSpace: { __typename?: 'SpaceResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, space?: { __typename?: 'Space', id: number, createdAt: string, updatedAt: string, spaceName: string, subscriptionStatus?: boolean | null, modStatus: boolean, avatar?: string | null, coverPhoto?: string | null, subscriberNumber: number, fullSpaceName?: string | null, headline?: string | null, rules?: string | null, about?: string | null } | null } };

export type DeleteCvMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCvMutation = { __typename?: 'Mutation', deleteCV: boolean };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type DeleteConversationMutationVariables = Exact<{
  firestoreCollectionId: Scalars['String'];
}>;


export type DeleteConversationMutation = { __typename?: 'Mutation', deleteConversation: boolean };

export type DeleteEducationItemMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteEducationItemMutation = { __typename?: 'Mutation', deleteEducationItem: boolean };

export type DeleteExperienceMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteExperienceMutation = { __typename?: 'Mutation', deleteExperience: boolean };

export type DeleteOfferMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteOfferMutation = { __typename?: 'Mutation', deleteOffer?: boolean | null };

export type DeleteOfferApplicationMutationVariables = Exact<{
  offerId: Scalars['Int'];
}>;


export type DeleteOfferApplicationMutation = { __typename?: 'Mutation', deleteOfferApplication: boolean };

export type DeletePageMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePageMutation = { __typename?: 'Mutation', deletePage: boolean };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost?: boolean | null };

export type DeleteQualificationMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteQualificationMutation = { __typename?: 'Mutation', deleteQualification: boolean };

export type DeleteSpaceMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteSpaceMutation = { __typename?: 'Mutation', deleteSpace: boolean };

export type DeleteSpaceAvatarMutationVariables = Exact<{
  key: Scalars['String'];
}>;


export type DeleteSpaceAvatarMutation = { __typename?: 'Mutation', deleteSpaceAvatar: boolean };

export type DeleteSpaceCoverPhotoMutationVariables = Exact<{
  key: Scalars['String'];
}>;


export type DeleteSpaceCoverPhotoMutation = { __typename?: 'Mutation', deleteSpaceCoverPhoto: boolean };

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['Int'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser?: boolean | null };

export type FollowMutationVariables = Exact<{
  pageId: Scalars['Int'];
}>;


export type FollowMutation = { __typename?: 'Mutation', follow: boolean };

export type FollowUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPasswordResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LoginMutationVariables = Exact<{
  emailOrUsername: Scalars['String'];
  password: Scalars['String'];
  location?: InputMaybe<Location>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  location?: InputMaybe<Location>;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null } };

export type SetSkillsMutationVariables = Exact<{
  skills: Array<Scalars['String']> | Scalars['String'];
}>;


export type SetSkillsMutation = { __typename?: 'Mutation', setSkills?: Array<string> | null };

export type SubscribeMutationVariables = Exact<{
  spaceId: Scalars['Int'];
}>;


export type SubscribeMutation = { __typename?: 'Mutation', subscribe: boolean };

export type UnfollowMutationVariables = Exact<{
  pageId: Scalars['Int'];
}>;


export type UnfollowMutation = { __typename?: 'Mutation', unfollow: boolean };

export type UnfollowUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser: boolean };

export type UnsubscribeMutationVariables = Exact<{
  spaceId: Scalars['Int'];
}>;


export type UnsubscribeMutation = { __typename?: 'Mutation', unsubscribe: boolean };

export type UpdateApplicationStatusMutationVariables = Exact<{
  status: Scalars['String'];
  id: Scalars['Int'];
}>;


export type UpdateApplicationStatusMutation = { __typename?: 'Mutation', updateApplicationStatus: { __typename?: 'OfferApplication', id: number, userId: number, offerId: number, status: string } };

export type UpdateCommentMutationVariables = Exact<{
  id: Scalars['Int'];
  text: Scalars['String'];
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment?: { __typename?: 'Comment', id: number, createdAt?: string | null, updatedAt?: string | null, text: string, creatorType: string, points: number, voteStatus?: number | null, creator?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null, pageCreator?: { __typename?: 'Page', id: number, createdAt?: string | null, updatedAt?: string | null, avatar?: string | null, coverPhoto?: string | null, pageName: string, followStatus?: boolean | null, ownerStatus?: boolean | null, fullPageName?: string | null, headline?: string | null, address?: string | null, about?: string | null, followerNumber: number, owners?: Array<{ __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null }> | null } | null } | null };

export type UpdateEducationItemMutationVariables = Exact<{
  id: Scalars['Int'];
  input: EducationItemInput;
}>;


export type UpdateEducationItemMutation = { __typename?: 'Mutation', updateEducationItem: { __typename?: 'EducationItemResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, educationItem?: { __typename?: 'EducationItem', id: number, school: string, status?: string | null, startDate?: any | null, endDate?: any | null, photo?: string | null, photoUrl?: string | null } | null } };

export type UpdateExperienceMutationVariables = Exact<{
  id: Scalars['Int'];
  input: ExperienceInput;
}>;


export type UpdateExperienceMutation = { __typename?: 'Mutation', updateExperience: { __typename?: 'ExperienceResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, experience?: { __typename?: 'Experience', id: number, title: string, workplace?: string | null, startDate?: any | null, endDate?: any | null, photo?: string | null, photoUrl?: string | null } | null } };

export type UpdateInfoMutationVariables = Exact<{
  input: UserInfo;
}>;


export type UpdateInfoMutation = { __typename?: 'Mutation', updateInfo: boolean };

export type UpdateOfferMutationVariables = Exact<{
  id: Scalars['Int'];
  input: OfferInputUpdate;
}>;


export type UpdateOfferMutation = { __typename?: 'Mutation', updateOffer?: { __typename?: 'Offer', id: number, createdAt: string, updatedAt: string, title: string, workplace?: string | null, address?: string | null, recruiting?: boolean | null, employmentType?: string | null, salaryRange?: string | null, department?: string | null, requirements?: string | null, benefits?: string | null, description?: string | null, applicantsNo: number, applicationStatus?: string | null, creatorType?: string | null, photo?: string | null, photoUrl?: string | null, creator?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null, pageCreator?: { __typename?: 'Page', id: number, createdAt?: string | null, updatedAt?: string | null, avatar?: string | null, coverPhoto?: string | null, pageName: string, followStatus?: boolean | null, ownerStatus?: boolean | null, fullPageName?: string | null, headline?: string | null, address?: string | null, about?: string | null, followerNumber: number, owners?: Array<{ __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null }> | null } | null, space?: { __typename?: 'Space', id: number, createdAt: string, updatedAt: string, spaceName: string, subscriptionStatus?: boolean | null, modStatus: boolean, avatar?: string | null, coverPhoto?: string | null, subscriberNumber: number, fullSpaceName?: string | null, headline?: string | null, rules?: string | null, about?: string | null } | null } | null };

export type UpdatePageInfoMutationVariables = Exact<{
  id: Scalars['Int'];
  input: PageInfo;
}>;


export type UpdatePageInfoMutation = { __typename?: 'Mutation', updatePageInfo: boolean };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  input: PostInputUpdate;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: { __typename?: 'PostResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, post?: { __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, text: string, points: number, voteStatus?: number | null, creatorType: string, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null, creator?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null, pageCreator?: { __typename?: 'Page', id: number, createdAt?: string | null, updatedAt?: string | null, avatar?: string | null, coverPhoto?: string | null, pageName: string, followStatus?: boolean | null, ownerStatus?: boolean | null, fullPageName?: string | null, headline?: string | null, address?: string | null, about?: string | null, followerNumber: number, owners?: Array<{ __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null }> | null } | null, space: { __typename?: 'Space', id: number, createdAt: string, updatedAt: string, spaceName: string, subscriptionStatus?: boolean | null, modStatus: boolean, avatar?: string | null, coverPhoto?: string | null, subscriberNumber: number, fullSpaceName?: string | null, headline?: string | null, rules?: string | null, about?: string | null } } | null } | null };

export type UpdateQualificationMutationVariables = Exact<{
  id: Scalars['Int'];
  input: QualificationInput;
}>;


export type UpdateQualificationMutation = { __typename?: 'Mutation', updateQualification: { __typename?: 'QualificationResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, qualification?: { __typename?: 'Qualification', id: number, name: string, issuingOrganisation: string, issuanceDate?: any | null, expire: boolean, expirationDate?: any | null, credentialID?: string | null, credentialURL?: string | null, photo?: string | null, photoUrl?: string | null } | null } };

export type UpdateSpaceInfoMutationVariables = Exact<{
  id: Scalars['Int'];
  input: SpaceInfo;
}>;


export type UpdateSpaceInfoMutation = { __typename?: 'Mutation', updateSpaceInfo: boolean };

export type UploadAvatarMutationVariables = Exact<{
  upload: Scalars['Upload'];
}>;


export type UploadAvatarMutation = { __typename?: 'Mutation', uploadAvatar?: { __typename?: 'UploadedFileResponse', filename: string, mimetype: string, encoding: string, url: string } | null };

export type UploadCvMutationVariables = Exact<{
  upload: Scalars['Upload'];
}>;


export type UploadCvMutation = { __typename?: 'Mutation', uploadCV?: { __typename?: 'UploadedFileResponse', filename: string, mimetype: string, encoding: string, url: string } | null };

export type UploadCoverPhotoMutationVariables = Exact<{
  upload: Scalars['Upload'];
}>;


export type UploadCoverPhotoMutation = { __typename?: 'Mutation', uploadCoverPhoto?: { __typename?: 'UploadedFileResponse', filename: string, mimetype: string, encoding: string, url: string } | null };

export type UploadPageAvatarMutationVariables = Exact<{
  upload: Scalars['Upload'];
  pageId: Scalars['Int'];
}>;


export type UploadPageAvatarMutation = { __typename?: 'Mutation', uploadPageAvatar?: { __typename?: 'UploadedFileResponse', filename: string, mimetype: string, encoding: string, url: string } | null };

export type UploadPageCoverPhotoMutationVariables = Exact<{
  upload: Scalars['Upload'];
  pageId: Scalars['Int'];
}>;


export type UploadPageCoverPhotoMutation = { __typename?: 'Mutation', uploadPageCoverPhoto?: { __typename?: 'UploadedFileResponse', filename: string, mimetype: string, encoding: string, url: string } | null };

export type UploadSpaceAvatarMutationVariables = Exact<{
  upload: Scalars['Upload'];
  spaceId: Scalars['Int'];
}>;


export type UploadSpaceAvatarMutation = { __typename?: 'Mutation', uploadSpaceAvatar?: { __typename?: 'UploadedFileResponse', filename: string, mimetype: string, encoding: string, url: string } | null };

export type UploadSpaceCoverPhotoMutationVariables = Exact<{
  upload: Scalars['Upload'];
  spaceId: Scalars['Int'];
}>;


export type UploadSpaceCoverPhotoMutation = { __typename?: 'Mutation', uploadSpaceCoverPhoto?: { __typename?: 'UploadedFileResponse', filename: string, mimetype: string, encoding: string, url: string } | null };

export type VoteMutationVariables = Exact<{
  value: Scalars['Int'];
  postId: Scalars['Int'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: boolean };

export type VoteCommentMutationVariables = Exact<{
  value: Scalars['Int'];
  commentId: Scalars['Int'];
}>;


export type VoteCommentMutation = { __typename?: 'Mutation', voteComment: boolean };

export type AppliedOffersQueryVariables = Exact<{ [key: string]: never; }>;


export type AppliedOffersQuery = { __typename?: 'Query', appliedOffers: Array<{ __typename?: 'Offer', id: number, createdAt: string, updatedAt: string, title: string, workplace?: string | null, address?: string | null, recruiting?: boolean | null, employmentType?: string | null, salaryRange?: string | null, department?: string | null, requirements?: string | null, benefits?: string | null, description?: string | null, applicantsNo: number, applicationStatus?: string | null, creatorType?: string | null, photo?: string | null, photoUrl?: string | null, creator?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null, pageCreator?: { __typename?: 'Page', id: number, createdAt?: string | null, updatedAt?: string | null, avatar?: string | null, coverPhoto?: string | null, pageName: string, followStatus?: boolean | null, ownerStatus?: boolean | null, fullPageName?: string | null, headline?: string | null, address?: string | null, about?: string | null, followerNumber: number, owners?: Array<{ __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null }> | null } | null, space?: { __typename?: 'Space', id: number, createdAt: string, updatedAt: string, spaceName: string, subscriptionStatus?: boolean | null, modStatus: boolean, avatar?: string | null, coverPhoto?: string | null, subscriberNumber: number, fullSpaceName?: string | null, headline?: string | null, rules?: string | null, about?: string | null } | null }> };

export type AvatarUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type AvatarUrlQuery = { __typename?: 'Query', avatarUrl?: string | null };

export type AvatarsQueryVariables = Exact<{ [key: string]: never; }>;


export type AvatarsQuery = { __typename?: 'Query', avatars: Array<{ __typename?: 'PhotoResponse', key?: string | null, url?: string | null }> };

export type CommentsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
  postId: Scalars['Int'];
}>;


export type CommentsQuery = { __typename?: 'Query', comments: { __typename?: 'PaginatedComments', hasMore: boolean, comments: Array<{ __typename?: 'Comment', id: number, createdAt?: string | null, updatedAt?: string | null, text: string, creatorType: string, points: number, voteStatus?: number | null, creator?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null, pageCreator?: { __typename?: 'Page', id: number, createdAt?: string | null, updatedAt?: string | null, avatar?: string | null, coverPhoto?: string | null, pageName: string, followStatus?: boolean | null, ownerStatus?: boolean | null, fullPageName?: string | null, headline?: string | null, address?: string | null, about?: string | null, followerNumber: number, owners?: Array<{ __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null }> | null } | null }> } };

export type CoverPhotoUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type CoverPhotoUrlQuery = { __typename?: 'Query', coverPhotoUrl?: string | null };

export type CoverPhotosQueryVariables = Exact<{ [key: string]: never; }>;


export type CoverPhotosQuery = { __typename?: 'Query', coverPhotos: Array<{ __typename?: 'PhotoResponse', key?: string | null, url?: string | null }> };

export type CvsQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type CvsQuery = { __typename?: 'Query', cvs?: Array<{ __typename?: 'CV', id: number, filename: string, key: string, url?: string | null }> | null };

export type DeleteMessageMutationVariables = Exact<{
  messageDocumentId: Scalars['String'];
  firestoreCollectionId: Scalars['String'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage: boolean };

export type EducationItemsQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type EducationItemsQuery = { __typename?: 'Query', educationItems: Array<{ __typename?: 'EducationItem', id: number, school: string, status?: string | null, startDate?: any | null, endDate?: any | null, photo?: string | null, photoUrl?: string | null }> };

export type EmbedUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type EmbedUrlQuery = { __typename?: 'Query', embedUrl: string };

export type ExperiencesQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type ExperiencesQuery = { __typename?: 'Query', experiences: Array<{ __typename?: 'Experience', id: number, title: string, workplace?: string | null, startDate?: any | null, endDate?: any | null, photo?: string | null, photoUrl?: string | null }> };

export type FollowStatusQueryVariables = Exact<{
  pageId: Scalars['Int'];
}>;


export type FollowStatusQuery = { __typename?: 'Query', followStatus?: boolean | null };

export type GetSignedUrlQueryVariables = Exact<{
  key: Scalars['String'];
}>;


export type GetSignedUrlQuery = { __typename?: 'Query', getSignedUrl?: string | null };

export type GetSignedUrlsQueryVariables = Exact<{
  keys: Array<Scalars['String']> | Scalars['String'];
}>;


export type GetSignedUrlsQuery = { __typename?: 'Query', getSignedUrls: Array<string> };

export type InboxesQueryVariables = Exact<{
  firestoreCollectionIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type InboxesQuery = { __typename?: 'Query', inboxes: Array<{ __typename?: 'InboxResponse', firestoreCollectionId: string, partner: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null };

export type MyPagesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyPagesQuery = { __typename?: 'Query', myPages: Array<{ __typename?: 'Page', avatarUrl?: string | null, id: number, createdAt?: string | null, updatedAt?: string | null, avatar?: string | null, coverPhoto?: string | null, pageName: string, followStatus?: boolean | null, ownerStatus?: boolean | null, fullPageName?: string | null, headline?: string | null, address?: string | null, about?: string | null, followerNumber: number, owners?: Array<{ __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null }> | null }> };

export type MySpacesQueryVariables = Exact<{ [key: string]: never; }>;


export type MySpacesQuery = { __typename?: 'Query', mySpaces: Array<{ __typename?: 'Space', avatarUrl?: string | null, id: number, createdAt: string, updatedAt: string, spaceName: string, subscriptionStatus?: boolean | null, modStatus: boolean, avatar?: string | null, coverPhoto?: string | null, subscriberNumber: number, fullSpaceName?: string | null, headline?: string | null, rules?: string | null, about?: string | null }> };

export type OfferQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type OfferQuery = { __typename?: 'Query', offer?: { __typename?: 'Offer', id: number, createdAt: string, updatedAt: string, title: string, workplace?: string | null, address?: string | null, recruiting?: boolean | null, employmentType?: string | null, salaryRange?: string | null, department?: string | null, requirements?: string | null, benefits?: string | null, description?: string | null, applicantsNo: number, applicationStatus?: string | null, creatorType?: string | null, photo?: string | null, photoUrl?: string | null, applications?: Array<{ __typename?: 'OfferApplication', id: number, userId: number, offerId: number, status: string, user: { __typename?: 'User', avatarUrl?: string | null, id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } }> | null, creator?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null, pageCreator?: { __typename?: 'Page', id: number, createdAt?: string | null, updatedAt?: string | null, avatar?: string | null, coverPhoto?: string | null, pageName: string, followStatus?: boolean | null, ownerStatus?: boolean | null, fullPageName?: string | null, headline?: string | null, address?: string | null, about?: string | null, followerNumber: number, owners?: Array<{ __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null }> | null } | null, space?: { __typename?: 'Space', id: number, createdAt: string, updatedAt: string, spaceName: string, subscriptionStatus?: boolean | null, modStatus: boolean, avatar?: string | null, coverPhoto?: string | null, subscriberNumber: number, fullSpaceName?: string | null, headline?: string | null, rules?: string | null, about?: string | null } | null } | null };

export type OffersQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
  spaceId?: InputMaybe<Scalars['Int']>;
  pageId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
}>;


export type OffersQuery = { __typename?: 'Query', offers: { __typename?: 'PaginatedOffers', hasMore: boolean, offers: Array<{ __typename?: 'Offer', id: number, createdAt: string, updatedAt: string, title: string, workplace?: string | null, address?: string | null, recruiting?: boolean | null, employmentType?: string | null, salaryRange?: string | null, department?: string | null, requirements?: string | null, benefits?: string | null, description?: string | null, applicantsNo: number, applicationStatus?: string | null, creatorType?: string | null, photo?: string | null, photoUrl?: string | null, creator?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null, pageCreator?: { __typename?: 'Page', id: number, createdAt?: string | null, updatedAt?: string | null, avatar?: string | null, coverPhoto?: string | null, pageName: string, followStatus?: boolean | null, ownerStatus?: boolean | null, fullPageName?: string | null, headline?: string | null, address?: string | null, about?: string | null, followerNumber: number, owners?: Array<{ __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null }> | null } | null, space?: { __typename?: 'Space', id: number, createdAt: string, updatedAt: string, spaceName: string, subscriptionStatus?: boolean | null, modStatus: boolean, avatar?: string | null, coverPhoto?: string | null, subscriberNumber: number, fullSpaceName?: string | null, headline?: string | null, rules?: string | null, about?: string | null } | null }> } };

export type PageQueryVariables = Exact<{
  pageName: Scalars['String'];
}>;


export type PageQuery = { __typename?: 'Query', page: { __typename?: 'Page', avatarUrl?: string | null, id: number, createdAt?: string | null, updatedAt?: string | null, avatar?: string | null, coverPhoto?: string | null, pageName: string, followStatus?: boolean | null, ownerStatus?: boolean | null, fullPageName?: string | null, headline?: string | null, address?: string | null, about?: string | null, followerNumber: number, owners?: Array<{ __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null }> | null } };

export type PageAvatarsQueryVariables = Exact<{
  pageId: Scalars['Int'];
}>;


export type PageAvatarsQuery = { __typename?: 'Query', pageAvatars: Array<{ __typename?: 'PhotoResponse', key?: string | null, url?: string | null }> };

export type PageCoverPhotosQueryVariables = Exact<{
  pageId: Scalars['Int'];
}>;


export type PageCoverPhotosQuery = { __typename?: 'Query', pageCoverPhotos: Array<{ __typename?: 'PhotoResponse', key?: string | null, url?: string | null }> };

export type ParticipantsQueryVariables = Exact<{
  firestoreCollectionId: Scalars['String'];
}>;


export type ParticipantsQuery = { __typename?: 'Query', participants: Array<{ __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null }> };

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, text: string, points: number, voteStatus?: number | null, creatorType: string, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null, creator?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null, pageCreator?: { __typename?: 'Page', id: number, createdAt?: string | null, updatedAt?: string | null, avatar?: string | null, coverPhoto?: string | null, pageName: string, followStatus?: boolean | null, ownerStatus?: boolean | null, fullPageName?: string | null, headline?: string | null, address?: string | null, about?: string | null, followerNumber: number, owners?: Array<{ __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null }> | null } | null, space: { __typename?: 'Space', id: number, createdAt: string, updatedAt: string, spaceName: string, subscriptionStatus?: boolean | null, modStatus: boolean, avatar?: string | null, coverPhoto?: string | null, subscriberNumber: number, fullSpaceName?: string | null, headline?: string | null, rules?: string | null, about?: string | null } } | null };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
  spaceId?: InputMaybe<Scalars['Int']>;
  pageId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPosts', hasMore: boolean, posts: Array<{ __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, text: string, points: number, voteStatus?: number | null, creatorType: string, tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null, creator?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null, pageCreator?: { __typename?: 'Page', id: number, createdAt?: string | null, updatedAt?: string | null, avatar?: string | null, coverPhoto?: string | null, pageName: string, followStatus?: boolean | null, ownerStatus?: boolean | null, fullPageName?: string | null, headline?: string | null, address?: string | null, about?: string | null, followerNumber: number, owners?: Array<{ __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null }> | null } | null, space: { __typename?: 'Space', id: number, createdAt: string, updatedAt: string, spaceName: string, subscriptionStatus?: boolean | null, modStatus: boolean, avatar?: string | null, coverPhoto?: string | null, subscriberNumber: number, fullSpaceName?: string | null, headline?: string | null, rules?: string | null, about?: string | null } }> } };

export type QualificationsQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type QualificationsQuery = { __typename?: 'Query', qualifications: Array<{ __typename?: 'Qualification', id: number, name: string, issuingOrganisation: string, issuanceDate?: any | null, expire: boolean, expirationDate?: any | null, credentialID?: string | null, credentialURL?: string | null, photo?: string | null, photoUrl?: string | null }> };

export type SpaceQueryVariables = Exact<{
  spaceName: Scalars['String'];
}>;


export type SpaceQuery = { __typename?: 'Query', space?: { __typename?: 'Space', id: number, createdAt: string, updatedAt: string, spaceName: string, subscriptionStatus?: boolean | null, modStatus: boolean, avatar?: string | null, coverPhoto?: string | null, subscriberNumber: number, fullSpaceName?: string | null, headline?: string | null, rules?: string | null, about?: string | null } | null };

export type SpaceAvatarsQueryVariables = Exact<{
  spaceId: Scalars['Int'];
}>;


export type SpaceAvatarsQuery = { __typename?: 'Query', spaceAvatars: Array<{ __typename?: 'PhotoResponse', key?: string | null, url?: string | null }> };

export type SpaceCoverPhotosQueryVariables = Exact<{
  spaceId: Scalars['Int'];
}>;


export type SpaceCoverPhotosQuery = { __typename?: 'Query', spaceCoverPhotos: Array<{ __typename?: 'PhotoResponse', key?: string | null, url?: string | null }> };

export type SubscriptionStatusQueryVariables = Exact<{
  spaceId?: InputMaybe<Scalars['Int']>;
}>;


export type SubscriptionStatusQuery = { __typename?: 'Query', subscriptionStatus?: boolean | null };

export type TagsQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsQuery = { __typename?: 'Query', tags?: Array<{ __typename?: 'Tag', id: number, name: string }> | null };

export type TriggerOffersInvalidateMutationVariables = Exact<{ [key: string]: never; }>;


export type TriggerOffersInvalidateMutation = { __typename?: 'Mutation', triggerOffersInvalidate: boolean };

export type TriggerPostsInvalidateMutationVariables = Exact<{ [key: string]: never; }>;


export type TriggerPostsInvalidateMutation = { __typename?: 'Mutation', triggerPostsInvalidate: boolean };

export type UserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, username: string, fullName?: string | null, headline?: string | null, address?: string | null, about?: string | null, avatar?: string | null, avatarUrl?: string | null, coverPhoto?: string | null, coverPhotoUrl?: string | null, followerNumber: number, followingNumber: number, skills?: Array<string> | null } | null };

export type UserFollowStatusQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserFollowStatusQuery = { __typename?: 'Query', userFollowStatus?: boolean | null };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  fullName
  headline
  address
  about
  avatar
  avatarUrl
  coverPhoto
  coverPhotoUrl
  followerNumber
  followingNumber
  skills
}
    `;
export const RegularPageFragmentDoc = gql`
    fragment RegularPage on Page {
  id
  createdAt
  updatedAt
  avatar
  coverPhoto
  pageName
  followStatus
  ownerStatus
  fullPageName
  headline
  address
  about
  followerNumber
  owners {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const RegularCommentFragmentDoc = gql`
    fragment RegularComment on Comment {
  id
  createdAt
  updatedAt
  text
  creatorType
  creator {
    ...RegularUser
  }
  pageCreator {
    ...RegularPage
  }
  points
  voteStatus
}
    ${RegularUserFragmentDoc}
${RegularPageFragmentDoc}`;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularSpaceFragmentDoc = gql`
    fragment RegularSpace on Space {
  id
  createdAt
  updatedAt
  spaceName
  subscriptionStatus
  modStatus
  avatar
  coverPhoto
  subscriberNumber
  fullSpaceName
  headline
  rules
  about
}
    `;
export const RegularPostFragmentDoc = gql`
    fragment RegularPost on Post {
  id
  createdAt
  updatedAt
  title
  text
  points
  voteStatus
  creatorType
  tags {
    id
    name
  }
  creator {
    ...RegularUser
  }
  pageCreator {
    ...RegularPage
  }
  space {
    ...RegularSpace
  }
}
    ${RegularUserFragmentDoc}
${RegularPageFragmentDoc}
${RegularSpaceFragmentDoc}`;
export const RegularCreatePostResponseFragmentDoc = gql`
    fragment RegularCreatePostResponse on PostResponse {
  errors {
    ...RegularError
  }
  post {
    ...RegularPost
  }
}
    ${RegularErrorFragmentDoc}
${RegularPostFragmentDoc}`;
export const RegularEducationItemFragmentDoc = gql`
    fragment RegularEducationItem on EducationItem {
  id
  school
  status
  startDate
  endDate
  photo
  photoUrl
}
    `;
export const RegularExperienceFragmentDoc = gql`
    fragment RegularExperience on Experience {
  id
  title
  workplace
  startDate
  endDate
  photo
  photoUrl
}
    `;
export const RegularFileFragmentDoc = gql`
    fragment RegularFile on UploadedFileResponse {
  filename
  mimetype
  encoding
  url
}
    `;
export const RegularMessageFragmentDoc = gql`
    fragment RegularMessage on Message {
  id
  createdAt
  updatedAt
  type
  content
  senderId
}
    `;
export const RegularOfferFragmentDoc = gql`
    fragment RegularOffer on Offer {
  id
  createdAt
  updatedAt
  title
  workplace
  address
  recruiting
  employmentType
  salaryRange
  department
  requirements
  benefits
  description
  applicantsNo
  applicationStatus
  creatorType
  photo
  photoUrl
  creator {
    ...RegularUser
  }
  pageCreator {
    ...RegularPage
  }
  space {
    ...RegularSpace
  }
}
    ${RegularUserFragmentDoc}
${RegularPageFragmentDoc}
${RegularSpaceFragmentDoc}`;
export const RegularOfferApplicationFragmentDoc = gql`
    fragment RegularOfferApplication on OfferApplication {
  id
  userId
  offerId
  status
}
    `;
export const RegularPhotoResponseFragmentDoc = gql`
    fragment RegularPhotoResponse on PhotoResponse {
  key
  url
}
    `;
export const RegularQualificationFragmentDoc = gql`
    fragment RegularQualification on Qualification {
  id
  name
  issuingOrganisation
  issuanceDate
  expire
  expirationDate
  credentialID
  credentialURL
  photo
  photoUrl
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ApplyDocument = gql`
    mutation Apply($offerId: Int!) {
  apply(offerId: $offerId) {
    ...RegularOfferApplication
  }
}
    ${RegularOfferApplicationFragmentDoc}`;

export function useApplyMutation() {
  return Urql.useMutation<ApplyMutation, ApplyMutationVariables>(ApplyDocument);
};
export const ChangeAvatarDocument = gql`
    mutation ChangeAvatar($key: String!) {
  changeAvatar(key: $key)
}
    `;

export function useChangeAvatarMutation() {
  return Urql.useMutation<ChangeAvatarMutation, ChangeAvatarMutationVariables>(ChangeAvatarDocument);
};
export const ChangeCoverPhotoDocument = gql`
    mutation ChangeCoverPhoto($key: String!) {
  changeCoverPhoto(key: $key)
}
    `;

export function useChangeCoverPhotoMutation() {
  return Urql.useMutation<ChangeCoverPhotoMutation, ChangeCoverPhotoMutationVariables>(ChangeCoverPhotoDocument);
};
export const ChangePageAvatarDocument = gql`
    mutation ChangePageAvatar($key: String!, $pageId: Int!) {
  changePageAvatar(key: $key, pageId: $pageId)
}
    `;

export function useChangePageAvatarMutation() {
  return Urql.useMutation<ChangePageAvatarMutation, ChangePageAvatarMutationVariables>(ChangePageAvatarDocument);
};
export const ChangePageCoverPhotoDocument = gql`
    mutation ChangePageCoverPhoto($key: String!, $pageId: Int!) {
  changePageCoverPhoto(key: $key, pageId: $pageId)
}
    `;

export function useChangePageCoverPhotoMutation() {
  return Urql.useMutation<ChangePageCoverPhotoMutation, ChangePageCoverPhotoMutationVariables>(ChangePageCoverPhotoDocument);
};
export const ChangePasswordDocument = gql`
    mutation changePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const ChangeSpaceAvatarDocument = gql`
    mutation ChangeSpaceAvatar($key: String!, $spaceId: Int!) {
  changeSpaceAvatar(key: $key, spaceId: $spaceId)
}
    `;

export function useChangeSpaceAvatarMutation() {
  return Urql.useMutation<ChangeSpaceAvatarMutation, ChangeSpaceAvatarMutationVariables>(ChangeSpaceAvatarDocument);
};
export const ChangeSpaceCoverPhotoDocument = gql`
    mutation ChangeSpaceCoverPhoto($key: String!, $spaceId: Int!) {
  changeSpaceCoverPhoto(key: $key, spaceId: $spaceId)
}
    `;

export function useChangeSpaceCoverPhotoMutation() {
  return Urql.useMutation<ChangeSpaceCoverPhotoMutation, ChangeSpaceCoverPhotoMutationVariables>(ChangeSpaceCoverPhotoDocument);
};
export const CreateCommentDocument = gql`
    mutation CreateComment($postId: Int!, $text: String!, $pageId: Int) {
  createComment(postId: $postId, text: $text, pageId: $pageId) {
    ...RegularComment
  }
}
    ${RegularCommentFragmentDoc}`;

export function useCreateCommentMutation() {
  return Urql.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument);
};
export const CreateConversationDocument = gql`
    mutation CreateConversation($partnerUsername: String!) {
  createConversation(partnerUsername: $partnerUsername) {
    errors {
      ...RegularError
    }
    conversation {
      id
    }
  }
}
    ${RegularErrorFragmentDoc}`;

export function useCreateConversationMutation() {
  return Urql.useMutation<CreateConversationMutation, CreateConversationMutationVariables>(CreateConversationDocument);
};
export const CreateEducationItemDocument = gql`
    mutation CreateEducationItem($input: EducationItemInput!) {
  createEducationItem(input: $input) {
    errors {
      ...RegularError
    }
    educationItem {
      ...RegularEducationItem
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularEducationItemFragmentDoc}`;

export function useCreateEducationItemMutation() {
  return Urql.useMutation<CreateEducationItemMutation, CreateEducationItemMutationVariables>(CreateEducationItemDocument);
};
export const CreateExperienceDocument = gql`
    mutation CreateExperience($input: ExperienceInput!) {
  createExperience(input: $input) {
    errors {
      ...RegularError
    }
    experience {
      ...RegularExperience
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularExperienceFragmentDoc}`;

export function useCreateExperienceMutation() {
  return Urql.useMutation<CreateExperienceMutation, CreateExperienceMutationVariables>(CreateExperienceDocument);
};
export const CreateMessageDocument = gql`
    mutation CreateMessage($input: MessageInput!, $firestoreCollectionId: String!) {
  createMessage(input: $input, firestoreCollectionId: $firestoreCollectionId) {
    ...RegularMessage
  }
}
    ${RegularMessageFragmentDoc}`;

export function useCreateMessageMutation() {
  return Urql.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument);
};
export const CreateOfferDocument = gql`
    mutation CreateOffer($input: OfferInputCreate!) {
  createOffer(input: $input) {
    errors {
      ...RegularError
    }
    offer {
      ...RegularOffer
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularOfferFragmentDoc}`;

export function useCreateOfferMutation() {
  return Urql.useMutation<CreateOfferMutation, CreateOfferMutationVariables>(CreateOfferDocument);
};
export const CreatePageDocument = gql`
    mutation CreatePage($pageName: String!) {
  createPage(pageName: $pageName) {
    errors {
      ...RegularError
    }
    page {
      ...RegularPage
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularPageFragmentDoc}`;

export function useCreatePageMutation() {
  return Urql.useMutation<CreatePageMutation, CreatePageMutationVariables>(CreatePageDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInputCreate!) {
  createPost(input: $input) {
    ...RegularCreatePostResponse
  }
}
    ${RegularCreatePostResponseFragmentDoc}`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const CreateQualificationDocument = gql`
    mutation CreateQualification($input: QualificationInput!) {
  createQualification(input: $input) {
    errors {
      ...RegularError
    }
    qualification {
      ...RegularQualification
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularQualificationFragmentDoc}`;

export function useCreateQualificationMutation() {
  return Urql.useMutation<CreateQualificationMutation, CreateQualificationMutationVariables>(CreateQualificationDocument);
};
export const CreateSpaceDocument = gql`
    mutation CreateSpace($spaceName: String!) {
  createSpace(spaceName: $spaceName) {
    errors {
      ...RegularError
    }
    space {
      ...RegularSpace
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularSpaceFragmentDoc}`;

export function useCreateSpaceMutation() {
  return Urql.useMutation<CreateSpaceMutation, CreateSpaceMutationVariables>(CreateSpaceDocument);
};
export const DeleteCvDocument = gql`
    mutation DeleteCV($id: Int!) {
  deleteCV(id: $id)
}
    `;

export function useDeleteCvMutation() {
  return Urql.useMutation<DeleteCvMutation, DeleteCvMutationVariables>(DeleteCvDocument);
};
export const DeleteCommentDocument = gql`
    mutation DeleteComment($id: Int!) {
  deleteComment(id: $id)
}
    `;

export function useDeleteCommentMutation() {
  return Urql.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument);
};
export const DeleteConversationDocument = gql`
    mutation DeleteConversation($firestoreCollectionId: String!) {
  deleteConversation(firestoreCollectionId: $firestoreCollectionId)
}
    `;

export function useDeleteConversationMutation() {
  return Urql.useMutation<DeleteConversationMutation, DeleteConversationMutationVariables>(DeleteConversationDocument);
};
export const DeleteEducationItemDocument = gql`
    mutation DeleteEducationItem($id: Int!) {
  deleteEducationItem(id: $id)
}
    `;

export function useDeleteEducationItemMutation() {
  return Urql.useMutation<DeleteEducationItemMutation, DeleteEducationItemMutationVariables>(DeleteEducationItemDocument);
};
export const DeleteExperienceDocument = gql`
    mutation DeleteExperience($id: Int!) {
  deleteExperience(id: $id)
}
    `;

export function useDeleteExperienceMutation() {
  return Urql.useMutation<DeleteExperienceMutation, DeleteExperienceMutationVariables>(DeleteExperienceDocument);
};
export const DeleteOfferDocument = gql`
    mutation DeleteOffer($id: Int!) {
  deleteOffer(id: $id)
}
    `;

export function useDeleteOfferMutation() {
  return Urql.useMutation<DeleteOfferMutation, DeleteOfferMutationVariables>(DeleteOfferDocument);
};
export const DeleteOfferApplicationDocument = gql`
    mutation DeleteOfferApplication($offerId: Int!) {
  deleteOfferApplication(offerId: $offerId)
}
    `;

export function useDeleteOfferApplicationMutation() {
  return Urql.useMutation<DeleteOfferApplicationMutation, DeleteOfferApplicationMutationVariables>(DeleteOfferApplicationDocument);
};
export const DeletePageDocument = gql`
    mutation DeletePage($id: Int!) {
  deletePage(id: $id)
}
    `;

export function useDeletePageMutation() {
  return Urql.useMutation<DeletePageMutation, DeletePageMutationVariables>(DeletePageDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($id: Int!) {
  deletePost(id: $id)
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const DeleteQualificationDocument = gql`
    mutation DeleteQualification($id: Int!) {
  deleteQualification(id: $id)
}
    `;

export function useDeleteQualificationMutation() {
  return Urql.useMutation<DeleteQualificationMutation, DeleteQualificationMutationVariables>(DeleteQualificationDocument);
};
export const DeleteSpaceDocument = gql`
    mutation DeleteSpace($id: Int!) {
  deleteSpace(id: $id)
}
    `;

export function useDeleteSpaceMutation() {
  return Urql.useMutation<DeleteSpaceMutation, DeleteSpaceMutationVariables>(DeleteSpaceDocument);
};
export const DeleteSpaceAvatarDocument = gql`
    mutation DeleteSpaceAvatar($key: String!) {
  deleteSpaceAvatar(key: $key)
}
    `;

export function useDeleteSpaceAvatarMutation() {
  return Urql.useMutation<DeleteSpaceAvatarMutation, DeleteSpaceAvatarMutationVariables>(DeleteSpaceAvatarDocument);
};
export const DeleteSpaceCoverPhotoDocument = gql`
    mutation DeleteSpaceCoverPhoto($key: String!) {
  deleteSpaceCoverPhoto(key: $key)
}
    `;

export function useDeleteSpaceCoverPhotoMutation() {
  return Urql.useMutation<DeleteSpaceCoverPhotoMutation, DeleteSpaceCoverPhotoMutationVariables>(DeleteSpaceCoverPhotoDocument);
};
export const DeleteUserDocument = gql`
    mutation DeleteUser($deleteUserId: Int!) {
  deleteUser(id: $deleteUserId)
}
    `;

export function useDeleteUserMutation() {
  return Urql.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument);
};
export const FollowDocument = gql`
    mutation Follow($pageId: Int!) {
  follow(pageId: $pageId)
}
    `;

export function useFollowMutation() {
  return Urql.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument);
};
export const FollowUserDocument = gql`
    mutation FollowUser($id: Int!) {
  followUser(id: $id)
}
    `;

export function useFollowUserMutation() {
  return Urql.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    errors {
      ...RegularError
    }
    success
  }
}
    ${RegularErrorFragmentDoc}`;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($emailOrUsername: String!, $password: String!, $location: Location) {
  login(
    emailOrUsername: $emailOrUsername
    password: $password
    location: $location
  ) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($email: String!, $username: String!, $password: String!, $location: Location) {
  register(
    email: $email
    username: $username
    password: $password
    location: $location
  ) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const SetSkillsDocument = gql`
    mutation SetSkills($skills: [String!]!) {
  setSkills(skills: $skills)
}
    `;

export function useSetSkillsMutation() {
  return Urql.useMutation<SetSkillsMutation, SetSkillsMutationVariables>(SetSkillsDocument);
};
export const SubscribeDocument = gql`
    mutation Subscribe($spaceId: Int!) {
  subscribe(spaceId: $spaceId)
}
    `;

export function useSubscribeMutation() {
  return Urql.useMutation<SubscribeMutation, SubscribeMutationVariables>(SubscribeDocument);
};
export const UnfollowDocument = gql`
    mutation Unfollow($pageId: Int!) {
  unfollow(pageId: $pageId)
}
    `;

export function useUnfollowMutation() {
  return Urql.useMutation<UnfollowMutation, UnfollowMutationVariables>(UnfollowDocument);
};
export const UnfollowUserDocument = gql`
    mutation UnfollowUser($id: Int!) {
  unfollowUser(id: $id)
}
    `;

export function useUnfollowUserMutation() {
  return Urql.useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UnfollowUserDocument);
};
export const UnsubscribeDocument = gql`
    mutation Unsubscribe($spaceId: Int!) {
  unsubscribe(spaceId: $spaceId)
}
    `;

export function useUnsubscribeMutation() {
  return Urql.useMutation<UnsubscribeMutation, UnsubscribeMutationVariables>(UnsubscribeDocument);
};
export const UpdateApplicationStatusDocument = gql`
    mutation UpdateApplicationStatus($status: String!, $id: Int!) {
  updateApplicationStatus(status: $status, id: $id) {
    ...RegularOfferApplication
  }
}
    ${RegularOfferApplicationFragmentDoc}`;

export function useUpdateApplicationStatusMutation() {
  return Urql.useMutation<UpdateApplicationStatusMutation, UpdateApplicationStatusMutationVariables>(UpdateApplicationStatusDocument);
};
export const UpdateCommentDocument = gql`
    mutation UpdateComment($id: Int!, $text: String!) {
  updateComment(id: $id, text: $text) {
    ...RegularComment
  }
}
    ${RegularCommentFragmentDoc}`;

export function useUpdateCommentMutation() {
  return Urql.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument);
};
export const UpdateEducationItemDocument = gql`
    mutation UpdateEducationItem($id: Int!, $input: EducationItemInput!) {
  updateEducationItem(id: $id, input: $input) {
    errors {
      ...RegularError
    }
    educationItem {
      ...RegularEducationItem
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularEducationItemFragmentDoc}`;

export function useUpdateEducationItemMutation() {
  return Urql.useMutation<UpdateEducationItemMutation, UpdateEducationItemMutationVariables>(UpdateEducationItemDocument);
};
export const UpdateExperienceDocument = gql`
    mutation UpdateExperience($id: Int!, $input: ExperienceInput!) {
  updateExperience(id: $id, input: $input) {
    errors {
      ...RegularError
    }
    experience {
      ...RegularExperience
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularExperienceFragmentDoc}`;

export function useUpdateExperienceMutation() {
  return Urql.useMutation<UpdateExperienceMutation, UpdateExperienceMutationVariables>(UpdateExperienceDocument);
};
export const UpdateInfoDocument = gql`
    mutation UpdateInfo($input: UserInfo!) {
  updateInfo(input: $input)
}
    `;

export function useUpdateInfoMutation() {
  return Urql.useMutation<UpdateInfoMutation, UpdateInfoMutationVariables>(UpdateInfoDocument);
};
export const UpdateOfferDocument = gql`
    mutation UpdateOffer($id: Int!, $input: OfferInputUpdate!) {
  updateOffer(id: $id, input: $input) {
    ...RegularOffer
  }
}
    ${RegularOfferFragmentDoc}`;

export function useUpdateOfferMutation() {
  return Urql.useMutation<UpdateOfferMutation, UpdateOfferMutationVariables>(UpdateOfferDocument);
};
export const UpdatePageInfoDocument = gql`
    mutation UpdatePageInfo($id: Int!, $input: PageInfo!) {
  updatePageInfo(id: $id, input: $input)
}
    `;

export function useUpdatePageInfoMutation() {
  return Urql.useMutation<UpdatePageInfoMutation, UpdatePageInfoMutationVariables>(UpdatePageInfoDocument);
};
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: Int!, $input: PostInputUpdate!) {
  updatePost(id: $id, input: $input) {
    errors {
      ...RegularError
    }
    post {
      ...RegularPost
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularPostFragmentDoc}`;

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument);
};
export const UpdateQualificationDocument = gql`
    mutation UpdateQualification($id: Int!, $input: QualificationInput!) {
  updateQualification(id: $id, input: $input) {
    errors {
      ...RegularError
    }
    qualification {
      ...RegularQualification
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularQualificationFragmentDoc}`;

export function useUpdateQualificationMutation() {
  return Urql.useMutation<UpdateQualificationMutation, UpdateQualificationMutationVariables>(UpdateQualificationDocument);
};
export const UpdateSpaceInfoDocument = gql`
    mutation UpdateSpaceInfo($id: Int!, $input: SpaceInfo!) {
  updateSpaceInfo(id: $id, input: $input)
}
    `;

export function useUpdateSpaceInfoMutation() {
  return Urql.useMutation<UpdateSpaceInfoMutation, UpdateSpaceInfoMutationVariables>(UpdateSpaceInfoDocument);
};
export const UploadAvatarDocument = gql`
    mutation UploadAvatar($upload: Upload!) {
  uploadAvatar(upload: $upload) {
    ...RegularFile
  }
}
    ${RegularFileFragmentDoc}`;

export function useUploadAvatarMutation() {
  return Urql.useMutation<UploadAvatarMutation, UploadAvatarMutationVariables>(UploadAvatarDocument);
};
export const UploadCvDocument = gql`
    mutation UploadCV($upload: Upload!) {
  uploadCV(upload: $upload) {
    filename
    mimetype
    encoding
    url
  }
}
    `;

export function useUploadCvMutation() {
  return Urql.useMutation<UploadCvMutation, UploadCvMutationVariables>(UploadCvDocument);
};
export const UploadCoverPhotoDocument = gql`
    mutation UploadCoverPhoto($upload: Upload!) {
  uploadCoverPhoto(upload: $upload) {
    ...RegularFile
  }
}
    ${RegularFileFragmentDoc}`;

export function useUploadCoverPhotoMutation() {
  return Urql.useMutation<UploadCoverPhotoMutation, UploadCoverPhotoMutationVariables>(UploadCoverPhotoDocument);
};
export const UploadPageAvatarDocument = gql`
    mutation UploadPageAvatar($upload: Upload!, $pageId: Int!) {
  uploadPageAvatar(upload: $upload, pageId: $pageId) {
    ...RegularFile
  }
}
    ${RegularFileFragmentDoc}`;

export function useUploadPageAvatarMutation() {
  return Urql.useMutation<UploadPageAvatarMutation, UploadPageAvatarMutationVariables>(UploadPageAvatarDocument);
};
export const UploadPageCoverPhotoDocument = gql`
    mutation UploadPageCoverPhoto($upload: Upload!, $pageId: Int!) {
  uploadPageCoverPhoto(upload: $upload, pageId: $pageId) {
    ...RegularFile
  }
}
    ${RegularFileFragmentDoc}`;

export function useUploadPageCoverPhotoMutation() {
  return Urql.useMutation<UploadPageCoverPhotoMutation, UploadPageCoverPhotoMutationVariables>(UploadPageCoverPhotoDocument);
};
export const UploadSpaceAvatarDocument = gql`
    mutation UploadSpaceAvatar($upload: Upload!, $spaceId: Int!) {
  uploadSpaceAvatar(upload: $upload, spaceId: $spaceId) {
    ...RegularFile
  }
}
    ${RegularFileFragmentDoc}`;

export function useUploadSpaceAvatarMutation() {
  return Urql.useMutation<UploadSpaceAvatarMutation, UploadSpaceAvatarMutationVariables>(UploadSpaceAvatarDocument);
};
export const UploadSpaceCoverPhotoDocument = gql`
    mutation UploadSpaceCoverPhoto($upload: Upload!, $spaceId: Int!) {
  uploadSpaceCoverPhoto(upload: $upload, spaceId: $spaceId) {
    ...RegularFile
  }
}
    ${RegularFileFragmentDoc}`;

export function useUploadSpaceCoverPhotoMutation() {
  return Urql.useMutation<UploadSpaceCoverPhotoMutation, UploadSpaceCoverPhotoMutationVariables>(UploadSpaceCoverPhotoDocument);
};
export const VoteDocument = gql`
    mutation Vote($value: Int!, $postId: Int!) {
  vote(value: $value, postId: $postId)
}
    `;

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
};
export const VoteCommentDocument = gql`
    mutation VoteComment($value: Int!, $commentId: Int!) {
  voteComment(value: $value, commentId: $commentId)
}
    `;

export function useVoteCommentMutation() {
  return Urql.useMutation<VoteCommentMutation, VoteCommentMutationVariables>(VoteCommentDocument);
};
export const AppliedOffersDocument = gql`
    query AppliedOffers {
  appliedOffers {
    ...RegularOffer
  }
}
    ${RegularOfferFragmentDoc}`;

export function useAppliedOffersQuery(options?: Omit<Urql.UseQueryArgs<AppliedOffersQueryVariables>, 'query'>) {
  return Urql.useQuery<AppliedOffersQuery>({ query: AppliedOffersDocument, ...options });
};
export const AvatarUrlDocument = gql`
    query AvatarUrl {
  avatarUrl
}
    `;

export function useAvatarUrlQuery(options?: Omit<Urql.UseQueryArgs<AvatarUrlQueryVariables>, 'query'>) {
  return Urql.useQuery<AvatarUrlQuery>({ query: AvatarUrlDocument, ...options });
};
export const AvatarsDocument = gql`
    query Avatars {
  avatars {
    ...RegularPhotoResponse
  }
}
    ${RegularPhotoResponseFragmentDoc}`;

export function useAvatarsQuery(options?: Omit<Urql.UseQueryArgs<AvatarsQueryVariables>, 'query'>) {
  return Urql.useQuery<AvatarsQuery>({ query: AvatarsDocument, ...options });
};
export const CommentsDocument = gql`
    query Comments($limit: Int!, $cursor: String, $postId: Int!) {
  comments(limit: $limit, cursor: $cursor, postId: $postId) {
    hasMore
    comments {
      ...RegularComment
    }
  }
}
    ${RegularCommentFragmentDoc}`;

export function useCommentsQuery(options: Omit<Urql.UseQueryArgs<CommentsQueryVariables>, 'query'>) {
  return Urql.useQuery<CommentsQuery>({ query: CommentsDocument, ...options });
};
export const CoverPhotoUrlDocument = gql`
    query CoverPhotoUrl {
  coverPhotoUrl
}
    `;

export function useCoverPhotoUrlQuery(options?: Omit<Urql.UseQueryArgs<CoverPhotoUrlQueryVariables>, 'query'>) {
  return Urql.useQuery<CoverPhotoUrlQuery>({ query: CoverPhotoUrlDocument, ...options });
};
export const CoverPhotosDocument = gql`
    query CoverPhotos {
  coverPhotos {
    ...RegularPhotoResponse
  }
}
    ${RegularPhotoResponseFragmentDoc}`;

export function useCoverPhotosQuery(options?: Omit<Urql.UseQueryArgs<CoverPhotosQueryVariables>, 'query'>) {
  return Urql.useQuery<CoverPhotosQuery>({ query: CoverPhotosDocument, ...options });
};
export const CvsDocument = gql`
    query CVS($userId: Int!) {
  cvs(userId: $userId) {
    id
    filename
    key
    url
  }
}
    `;

export function useCvsQuery(options: Omit<Urql.UseQueryArgs<CvsQueryVariables>, 'query'>) {
  return Urql.useQuery<CvsQuery>({ query: CvsDocument, ...options });
};
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($messageDocumentId: String!, $firestoreCollectionId: String!) {
  deleteMessage(
    messageDocumentId: $messageDocumentId
    firestoreCollectionId: $firestoreCollectionId
  )
}
    `;

export function useDeleteMessageMutation() {
  return Urql.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument);
};
export const EducationItemsDocument = gql`
    query EducationItems($userId: Int!) {
  educationItems(userId: $userId) {
    ...RegularEducationItem
  }
}
    ${RegularEducationItemFragmentDoc}`;

export function useEducationItemsQuery(options: Omit<Urql.UseQueryArgs<EducationItemsQueryVariables>, 'query'>) {
  return Urql.useQuery<EducationItemsQuery>({ query: EducationItemsDocument, ...options });
};
export const EmbedUrlDocument = gql`
    query EmbedUrl {
  embedUrl
}
    `;

export function useEmbedUrlQuery(options?: Omit<Urql.UseQueryArgs<EmbedUrlQueryVariables>, 'query'>) {
  return Urql.useQuery<EmbedUrlQuery>({ query: EmbedUrlDocument, ...options });
};
export const ExperiencesDocument = gql`
    query Experiences($userId: Int!) {
  experiences(userId: $userId) {
    ...RegularExperience
  }
}
    ${RegularExperienceFragmentDoc}`;

export function useExperiencesQuery(options: Omit<Urql.UseQueryArgs<ExperiencesQueryVariables>, 'query'>) {
  return Urql.useQuery<ExperiencesQuery>({ query: ExperiencesDocument, ...options });
};
export const FollowStatusDocument = gql`
    query FollowStatus($pageId: Int!) {
  followStatus(pageId: $pageId)
}
    `;

export function useFollowStatusQuery(options: Omit<Urql.UseQueryArgs<FollowStatusQueryVariables>, 'query'>) {
  return Urql.useQuery<FollowStatusQuery>({ query: FollowStatusDocument, ...options });
};
export const GetSignedUrlDocument = gql`
    query GetSignedUrl($key: String!) {
  getSignedUrl(key: $key)
}
    `;

export function useGetSignedUrlQuery(options: Omit<Urql.UseQueryArgs<GetSignedUrlQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSignedUrlQuery>({ query: GetSignedUrlDocument, ...options });
};
export const GetSignedUrlsDocument = gql`
    query GetSignedUrls($keys: [String!]!) {
  getSignedUrls(keys: $keys)
}
    `;

export function useGetSignedUrlsQuery(options: Omit<Urql.UseQueryArgs<GetSignedUrlsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSignedUrlsQuery>({ query: GetSignedUrlsDocument, ...options });
};
export const InboxesDocument = gql`
    query Inboxes($firestoreCollectionIds: [String!]!) {
  inboxes(firestoreCollectionIds: $firestoreCollectionIds) {
    firestoreCollectionId
    partner {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useInboxesQuery(options: Omit<Urql.UseQueryArgs<InboxesQueryVariables>, 'query'>) {
  return Urql.useQuery<InboxesQuery>({ query: InboxesDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MyPagesDocument = gql`
    query MyPages {
  myPages {
    avatarUrl
    ...RegularPage
  }
}
    ${RegularPageFragmentDoc}`;

export function useMyPagesQuery(options?: Omit<Urql.UseQueryArgs<MyPagesQueryVariables>, 'query'>) {
  return Urql.useQuery<MyPagesQuery>({ query: MyPagesDocument, ...options });
};
export const MySpacesDocument = gql`
    query MySpaces {
  mySpaces {
    avatarUrl
    ...RegularSpace
  }
}
    ${RegularSpaceFragmentDoc}`;

export function useMySpacesQuery(options?: Omit<Urql.UseQueryArgs<MySpacesQueryVariables>, 'query'>) {
  return Urql.useQuery<MySpacesQuery>({ query: MySpacesDocument, ...options });
};
export const OfferDocument = gql`
    query Offer($id: Int!) {
  offer(id: $id) {
    applications {
      id
      userId
      offerId
      status
      user {
        avatarUrl
        ...RegularUser
      }
    }
    ...RegularOffer
  }
}
    ${RegularUserFragmentDoc}
${RegularOfferFragmentDoc}`;

export function useOfferQuery(options: Omit<Urql.UseQueryArgs<OfferQueryVariables>, 'query'>) {
  return Urql.useQuery<OfferQuery>({ query: OfferDocument, ...options });
};
export const OffersDocument = gql`
    query Offers($limit: Int!, $cursor: String, $spaceId: Int, $pageId: Int, $userId: Int) {
  offers(
    limit: $limit
    cursor: $cursor
    spaceId: $spaceId
    pageId: $pageId
    userId: $userId
  ) {
    hasMore
    offers {
      ...RegularOffer
    }
  }
}
    ${RegularOfferFragmentDoc}`;

export function useOffersQuery(options: Omit<Urql.UseQueryArgs<OffersQueryVariables>, 'query'>) {
  return Urql.useQuery<OffersQuery>({ query: OffersDocument, ...options });
};
export const PageDocument = gql`
    query Page($pageName: String!) {
  page(pageName: $pageName) {
    avatarUrl
    ...RegularPage
  }
}
    ${RegularPageFragmentDoc}`;

export function usePageQuery(options: Omit<Urql.UseQueryArgs<PageQueryVariables>, 'query'>) {
  return Urql.useQuery<PageQuery>({ query: PageDocument, ...options });
};
export const PageAvatarsDocument = gql`
    query PageAvatars($pageId: Int!) {
  pageAvatars(pageId: $pageId) {
    ...RegularPhotoResponse
  }
}
    ${RegularPhotoResponseFragmentDoc}`;

export function usePageAvatarsQuery(options: Omit<Urql.UseQueryArgs<PageAvatarsQueryVariables>, 'query'>) {
  return Urql.useQuery<PageAvatarsQuery>({ query: PageAvatarsDocument, ...options });
};
export const PageCoverPhotosDocument = gql`
    query PageCoverPhotos($pageId: Int!) {
  pageCoverPhotos(pageId: $pageId) {
    ...RegularPhotoResponse
  }
}
    ${RegularPhotoResponseFragmentDoc}`;

export function usePageCoverPhotosQuery(options: Omit<Urql.UseQueryArgs<PageCoverPhotosQueryVariables>, 'query'>) {
  return Urql.useQuery<PageCoverPhotosQuery>({ query: PageCoverPhotosDocument, ...options });
};
export const ParticipantsDocument = gql`
    query Participants($firestoreCollectionId: String!) {
  participants(firestoreCollectionId: $firestoreCollectionId) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useParticipantsQuery(options: Omit<Urql.UseQueryArgs<ParticipantsQueryVariables>, 'query'>) {
  return Urql.useQuery<ParticipantsQuery>({ query: ParticipantsDocument, ...options });
};
export const PostDocument = gql`
    query Post($id: Int!) {
  post(id: $id) {
    ...RegularPost
  }
}
    ${RegularPostFragmentDoc}`;

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'>) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String, $spaceId: Int, $pageId: Int, $userId: Int) {
  posts(
    limit: $limit
    cursor: $cursor
    spaceId: $spaceId
    pageId: $pageId
    userId: $userId
  ) {
    hasMore
    posts {
      ...RegularPost
    }
  }
}
    ${RegularPostFragmentDoc}`;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const QualificationsDocument = gql`
    query Qualifications($userId: Int!) {
  qualifications(userId: $userId) {
    ...RegularQualification
  }
}
    ${RegularQualificationFragmentDoc}`;

export function useQualificationsQuery(options: Omit<Urql.UseQueryArgs<QualificationsQueryVariables>, 'query'>) {
  return Urql.useQuery<QualificationsQuery>({ query: QualificationsDocument, ...options });
};
export const SpaceDocument = gql`
    query Space($spaceName: String!) {
  space(spaceName: $spaceName) {
    ...RegularSpace
  }
}
    ${RegularSpaceFragmentDoc}`;

export function useSpaceQuery(options: Omit<Urql.UseQueryArgs<SpaceQueryVariables>, 'query'>) {
  return Urql.useQuery<SpaceQuery>({ query: SpaceDocument, ...options });
};
export const SpaceAvatarsDocument = gql`
    query SpaceAvatars($spaceId: Int!) {
  spaceAvatars(spaceId: $spaceId) {
    ...RegularPhotoResponse
  }
}
    ${RegularPhotoResponseFragmentDoc}`;

export function useSpaceAvatarsQuery(options: Omit<Urql.UseQueryArgs<SpaceAvatarsQueryVariables>, 'query'>) {
  return Urql.useQuery<SpaceAvatarsQuery>({ query: SpaceAvatarsDocument, ...options });
};
export const SpaceCoverPhotosDocument = gql`
    query SpaceCoverPhotos($spaceId: Int!) {
  spaceCoverPhotos(spaceId: $spaceId) {
    ...RegularPhotoResponse
  }
}
    ${RegularPhotoResponseFragmentDoc}`;

export function useSpaceCoverPhotosQuery(options: Omit<Urql.UseQueryArgs<SpaceCoverPhotosQueryVariables>, 'query'>) {
  return Urql.useQuery<SpaceCoverPhotosQuery>({ query: SpaceCoverPhotosDocument, ...options });
};
export const SubscriptionStatusDocument = gql`
    query SubscriptionStatus($spaceId: Int) {
  subscriptionStatus(spaceId: $spaceId)
}
    `;

export function useSubscriptionStatusQuery(options?: Omit<Urql.UseQueryArgs<SubscriptionStatusQueryVariables>, 'query'>) {
  return Urql.useQuery<SubscriptionStatusQuery>({ query: SubscriptionStatusDocument, ...options });
};
export const TagsDocument = gql`
    query Tags {
  tags {
    id
    name
  }
}
    `;

export function useTagsQuery(options?: Omit<Urql.UseQueryArgs<TagsQueryVariables>, 'query'>) {
  return Urql.useQuery<TagsQuery>({ query: TagsDocument, ...options });
};
export const TriggerOffersInvalidateDocument = gql`
    mutation TriggerOffersInvalidate {
  triggerOffersInvalidate
}
    `;

export function useTriggerOffersInvalidateMutation() {
  return Urql.useMutation<TriggerOffersInvalidateMutation, TriggerOffersInvalidateMutationVariables>(TriggerOffersInvalidateDocument);
};
export const TriggerPostsInvalidateDocument = gql`
    mutation TriggerPostsInvalidate {
  triggerPostsInvalidate
}
    `;

export function useTriggerPostsInvalidateMutation() {
  return Urql.useMutation<TriggerPostsInvalidateMutation, TriggerPostsInvalidateMutationVariables>(TriggerPostsInvalidateDocument);
};
export const UserDocument = gql`
    query User($username: String!) {
  user(username: $username) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};
export const UserFollowStatusDocument = gql`
    query UserFollowStatus($id: Int!) {
  userFollowStatus(id: $id)
}
    `;

export function useUserFollowStatusQuery(options: Omit<Urql.UseQueryArgs<UserFollowStatusQueryVariables>, 'query'>) {
  return Urql.useQuery<UserFollowStatusQuery>({ query: UserFollowStatusDocument, ...options });
};