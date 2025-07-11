PGDMP     6                    }            rh_db    14.17    14.17 u    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16394    rh_db    DATABASE     T   CREATE DATABASE rh_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'fr-FR';
    DROP DATABASE rh_db;
                postgres    false            �            1259    16467    Communes    TABLE     �   CREATE TABLE public."Communes" (
    id integer NOT NULL,
    name character varying(255),
    daira_id integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now()
);
    DROP TABLE public."Communes";
       public         heap    postgres    false            �            1259    16466    Communes_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Communes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Communes_id_seq";
       public          postgres    false    214            �           0    0    Communes_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Communes_id_seq" OWNED BY public."Communes".id;
          public          postgres    false    213            �            1259    16455    Dairas    TABLE     �   CREATE TABLE public."Dairas" (
    id integer NOT NULL,
    name character varying(255),
    wilaya_id integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now()
);
    DROP TABLE public."Dairas";
       public         heap    postgres    false            �            1259    16454    Dairas_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Dairas_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Dairas_id_seq";
       public          postgres    false    212            �           0    0    Dairas_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Dairas_id_seq" OWNED BY public."Dairas".id;
          public          postgres    false    211            �            1259    40961    DechargeArgents    TABLE     o  CREATE TABLE public."DechargeArgents" (
    id integer NOT NULL,
    employee_id integer,
    reason text NOT NULL,
    use_cni boolean DEFAULT true NOT NULL,
    somme_argent numeric(10,2) NOT NULL,
    unite_argent text NOT NULL,
    created_by integer,
    validated boolean DEFAULT false NOT NULL,
    "refuseReason" text,
    refused boolean DEFAULT false NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isRemis" boolean DEFAULT false NOT NULL,
    remis numeric(10,2) DEFAULT 0 NOT NULL
);
 %   DROP TABLE public."DechargeArgents";
       public         heap    postgres    false            �            1259    40960    DechargeArgents_id_seq    SEQUENCE     �   CREATE SEQUENCE public."DechargeArgents_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."DechargeArgents_id_seq";
       public          postgres    false    235            �           0    0    DechargeArgents_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."DechargeArgents_id_seq" OWNED BY public."DechargeArgents".id;
          public          postgres    false    234            �            1259    32785    DocumentLegals    TABLE     @  CREATE TABLE public."DocumentLegals" (
    id integer NOT NULL,
    name character varying(255),
    link character varying(255),
    color character varying(255),
    dashboard boolean DEFAULT true,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now()
);
 $   DROP TABLE public."DocumentLegals";
       public         heap    postgres    false            �            1259    32784    DocumentLegals_id_seq    SEQUENCE     �   CREATE SEQUENCE public."DocumentLegals_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."DocumentLegals_id_seq";
       public          postgres    false    233            �           0    0    DocumentLegals_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."DocumentLegals_id_seq" OWNED BY public."DocumentLegals".id;
          public          postgres    false    232            �            1259    16511 	   Employees    TABLE     �  CREATE TABLE public."Employees" (
    id integer NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    profession_id integer,
    cin character varying(255),
    hire_date date,
    user_id integer,
    createdat timestamp without time zone DEFAULT now(),
    updatedat timestamp without time zone DEFAULT now(),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    profile_picture character varying
);
    DROP TABLE public."Employees";
       public         heap    postgres    false            �            1259    16510    Employees_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Employees_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Employees_id_seq";
       public          postgres    false    222            �           0    0    Employees_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Employees_id_seq" OWNED BY public."Employees".id;
          public          postgres    false    221            �            1259    16587    ExitAuthorizations    TABLE       CREATE TABLE public."ExitAuthorizations" (
    id integer NOT NULL,
    employee_id integer,
    reason text NOT NULL,
    sortie_date date NOT NULL,
    sortie_time time without time zone NOT NULL,
    entree_date date NOT NULL,
    entree_time time without time zone NOT NULL,
    created_by integer,
    validated boolean DEFAULT false,
    refusereason text,
    refused boolean DEFAULT false,
    "refuseReason" text,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now()
);
 (   DROP TABLE public."ExitAuthorizations";
       public         heap    postgres    false            �            1259    16586    ExitAuthorizations_id_seq    SEQUENCE     �   CREATE SEQUENCE public."ExitAuthorizations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."ExitAuthorizations_id_seq";
       public          postgres    false    229            �           0    0    ExitAuthorizations_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."ExitAuthorizations_id_seq" OWNED BY public."ExitAuthorizations".id;
          public          postgres    false    228            �            1259    16571    MissionDestinations    TABLE     a  CREATE TABLE public."MissionDestinations" (
    mission_id integer NOT NULL,
    commune_id integer NOT NULL,
    createdat timestamp without time zone DEFAULT now(),
    updatedat timestamp without time zone DEFAULT now(),
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now()
);
 )   DROP TABLE public."MissionDestinations";
       public         heap    postgres    false            �            1259    16541    MissionOrders    TABLE     �  CREATE TABLE public."MissionOrders" (
    id integer NOT NULL,
    order_number character varying(255),
    employee_id integer,
    depart_commune_id integer,
    transport_id integer,
    validity_from date,
    validity_to date,
    reason text,
    created_by integer,
    validated boolean DEFAULT true,
    refusereason text,
    refused boolean DEFAULT false,
    rapport text,
    createdat timestamp without time zone DEFAULT now(),
    updatedat timestamp without time zone DEFAULT now(),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "refuseReason" text,
    destination text,
    billet text
);
 #   DROP TABLE public."MissionOrders";
       public         heap    postgres    false            �            1259    16540    MissionOrders_id_seq    SEQUENCE     �   CREATE SEQUENCE public."MissionOrders_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."MissionOrders_id_seq";
       public          postgres    false    226            �           0    0    MissionOrders_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."MissionOrders_id_seq" OWNED BY public."MissionOrders".id;
          public          postgres    false    225            �            1259    32769    Pays    TABLE     �   CREATE TABLE public."Pays" (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now()
);
    DROP TABLE public."Pays";
       public         heap    postgres    false            �            1259    32768    Pays_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Pays_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Pays_id_seq";
       public          postgres    false    231            �           0    0    Pays_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Pays_id_seq" OWNED BY public."Pays".id;
          public          postgres    false    230            �            1259    16504    Professions    TABLE     H  CREATE TABLE public."Professions" (
    id integer NOT NULL,
    name character varying(255),
    createdat timestamp without time zone DEFAULT now(),
    updatedat timestamp without time zone DEFAULT now(),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now()
);
 !   DROP TABLE public."Professions";
       public         heap    postgres    false            �            1259    16503    Professions_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Professions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."Professions_id_seq";
       public          postgres    false    220            �           0    0    Professions_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."Professions_id_seq" OWNED BY public."Professions".id;
          public          postgres    false    219            �            1259    16479    Roles    TABLE     K  CREATE TABLE public."Roles" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    createdat timestamp without time zone DEFAULT now(),
    updatedat timestamp without time zone DEFAULT now(),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now()
);
    DROP TABLE public."Roles";
       public         heap    postgres    false            �            1259    16478    Roles_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Roles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Roles_id_seq";
       public          postgres    false    216            �           0    0    Roles_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Roles_id_seq" OWNED BY public."Roles".id;
          public          postgres    false    215            �            1259    16530 
   Transports    TABLE     �  CREATE TABLE public."Transports" (
    id integer NOT NULL,
    type character varying(255),
    brand character varying(255),
    model character varying(255),
    registration character varying(255) NOT NULL,
    purchase_date date,
    createdat timestamp without time zone DEFAULT now(),
    updatedat timestamp without time zone DEFAULT now(),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now()
);
     DROP TABLE public."Transports";
       public         heap    postgres    false            �            1259    16529    Transports_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Transports_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Transports_id_seq";
       public          postgres    false    224            �           0    0    Transports_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Transports_id_seq" OWNED BY public."Transports".id;
          public          postgres    false    223            �            1259    16488    Users    TABLE     �  CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    role_id integer,
    createdat timestamp without time zone DEFAULT now(),
    updatedat timestamp without time zone DEFAULT now(),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now()
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    16487    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    218            �           0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    217            �            1259    16448    Wilayas    TABLE     �   CREATE TABLE public."Wilayas" (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    pays_id integer
);
    DROP TABLE public."Wilayas";
       public         heap    postgres    false            �            1259    16447    Wilayas_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Wilayas_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Wilayas_id_seq";
       public          postgres    false    210            �           0    0    Wilayas_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Wilayas_id_seq" OWNED BY public."Wilayas".id;
          public          postgres    false    209            �           2604    16470    Communes id    DEFAULT     n   ALTER TABLE ONLY public."Communes" ALTER COLUMN id SET DEFAULT nextval('public."Communes_id_seq"'::regclass);
 <   ALTER TABLE public."Communes" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            �           2604    16458 	   Dairas id    DEFAULT     j   ALTER TABLE ONLY public."Dairas" ALTER COLUMN id SET DEFAULT nextval('public."Dairas_id_seq"'::regclass);
 :   ALTER TABLE public."Dairas" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211    212            �           2604    40964    DechargeArgents id    DEFAULT     |   ALTER TABLE ONLY public."DechargeArgents" ALTER COLUMN id SET DEFAULT nextval('public."DechargeArgents_id_seq"'::regclass);
 C   ALTER TABLE public."DechargeArgents" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    235    235            �           2604    32788    DocumentLegals id    DEFAULT     z   ALTER TABLE ONLY public."DocumentLegals" ALTER COLUMN id SET DEFAULT nextval('public."DocumentLegals_id_seq"'::regclass);
 B   ALTER TABLE public."DocumentLegals" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    233    233            �           2604    16514    Employees id    DEFAULT     p   ALTER TABLE ONLY public."Employees" ALTER COLUMN id SET DEFAULT nextval('public."Employees_id_seq"'::regclass);
 =   ALTER TABLE public."Employees" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    16590    ExitAuthorizations id    DEFAULT     �   ALTER TABLE ONLY public."ExitAuthorizations" ALTER COLUMN id SET DEFAULT nextval('public."ExitAuthorizations_id_seq"'::regclass);
 F   ALTER TABLE public."ExitAuthorizations" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    228    229            �           2604    16544    MissionOrders id    DEFAULT     x   ALTER TABLE ONLY public."MissionOrders" ALTER COLUMN id SET DEFAULT nextval('public."MissionOrders_id_seq"'::regclass);
 A   ALTER TABLE public."MissionOrders" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    226    226            �           2604    32772    Pays id    DEFAULT     f   ALTER TABLE ONLY public."Pays" ALTER COLUMN id SET DEFAULT nextval('public."Pays_id_seq"'::regclass);
 8   ALTER TABLE public."Pays" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    231    231            �           2604    16507    Professions id    DEFAULT     t   ALTER TABLE ONLY public."Professions" ALTER COLUMN id SET DEFAULT nextval('public."Professions_id_seq"'::regclass);
 ?   ALTER TABLE public."Professions" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            �           2604    16482    Roles id    DEFAULT     h   ALTER TABLE ONLY public."Roles" ALTER COLUMN id SET DEFAULT nextval('public."Roles_id_seq"'::regclass);
 9   ALTER TABLE public."Roles" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    16533    Transports id    DEFAULT     r   ALTER TABLE ONLY public."Transports" ALTER COLUMN id SET DEFAULT nextval('public."Transports_id_seq"'::regclass);
 >   ALTER TABLE public."Transports" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224            �           2604    16491    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            �           2604    16451 
   Wilayas id    DEFAULT     l   ALTER TABLE ONLY public."Wilayas" ALTER COLUMN id SET DEFAULT nextval('public."Wilayas_id_seq"'::regclass);
 ;   ALTER TABLE public."Wilayas" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            �          0    16467    Communes 
   TABLE DATA           R   COPY public."Communes" (id, name, daira_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    214   ��       �          0    16455    Dairas 
   TABLE DATA           Q   COPY public."Dairas" (id, name, wilaya_id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    212   @�       �          0    40961    DechargeArgents 
   TABLE DATA           �   COPY public."DechargeArgents" (id, employee_id, reason, use_cni, somme_argent, unite_argent, created_by, validated, "refuseReason", refused, "createdAt", "updatedAt", "isRemis", remis) FROM stdin;
    public          postgres    false    235   �      �          0    32785    DocumentLegals 
   TABLE DATA           f   COPY public."DocumentLegals" (id, name, link, color, dashboard, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    233   �      �          0    16511 	   Employees 
   TABLE DATA           �   COPY public."Employees" (id, first_name, last_name, profession_id, cin, hire_date, user_id, createdat, updatedat, "createdAt", "updatedAt", profile_picture) FROM stdin;
    public          postgres    false    222   �      �          0    16587    ExitAuthorizations 
   TABLE DATA           �   COPY public."ExitAuthorizations" (id, employee_id, reason, sortie_date, sortie_time, entree_date, entree_time, created_by, validated, refusereason, refused, "refuseReason", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    229   /$      �          0    16571    MissionDestinations 
   TABLE DATA           w   COPY public."MissionDestinations" (mission_id, commune_id, createdat, updatedat, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    227   �'      �          0    16541    MissionOrders 
   TABLE DATA             COPY public."MissionOrders" (id, order_number, employee_id, depart_commune_id, transport_id, validity_from, validity_to, reason, created_by, validated, refusereason, refused, rapport, createdat, updatedat, "createdAt", "updatedAt", "refuseReason", destination, billet) FROM stdin;
    public          postgres    false    226   l1      �          0    32769    Pays 
   TABLE DATA           D   COPY public."Pays" (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    231   �E      �          0    16504    Professions 
   TABLE DATA           a   COPY public."Professions" (id, name, createdat, updatedat, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    220   eO      �          0    16479    Roles 
   TABLE DATA           [   COPY public."Roles" (id, name, createdat, updatedat, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   �Q      �          0    16530 
   Transports 
   TABLE DATA           �   COPY public."Transports" (id, type, brand, model, registration, purchase_date, createdat, updatedat, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    224   XR      �          0    16488    Users 
   TABLE DATA           w   COPY public."Users" (id, username, password_hash, role_id, createdat, updatedat, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   �S      �          0    16448    Wilayas 
   TABLE DATA           P   COPY public."Wilayas" (id, name, "createdAt", "updatedAt", pays_id) FROM stdin;
    public          postgres    false    210   Z      �           0    0    Communes_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Communes_id_seq"', 8, true);
          public          postgres    false    213            �           0    0    Dairas_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Dairas_id_seq"', 8, true);
          public          postgres    false    211            �           0    0    DechargeArgents_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."DechargeArgents_id_seq"', 13, true);
          public          postgres    false    234            �           0    0    DocumentLegals_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."DocumentLegals_id_seq"', 17, true);
          public          postgres    false    232            �           0    0    Employees_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Employees_id_seq"', 55, true);
          public          postgres    false    221            �           0    0    ExitAuthorizations_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."ExitAuthorizations_id_seq"', 16, true);
          public          postgres    false    228            �           0    0    MissionOrders_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."MissionOrders_id_seq"', 102, true);
          public          postgres    false    225            �           0    0    Pays_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Pays_id_seq"', 250, true);
          public          postgres    false    230            �           0    0    Professions_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Professions_id_seq"', 20, true);
          public          postgres    false    219            �           0    0    Roles_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Roles_id_seq"', 2, true);
          public          postgres    false    215            �           0    0    Transports_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Transports_id_seq"', 11, true);
          public          postgres    false    223            �           0    0    Users_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Users_id_seq"', 51, true);
          public          postgres    false    217            �           0    0    Wilayas_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Wilayas_id_seq"', 8, true);
          public          postgres    false    209            �           2606    16472    Communes Communes_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Communes"
    ADD CONSTRAINT "Communes_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Communes" DROP CONSTRAINT "Communes_pkey";
       public            postgres    false    214            �           2606    16460    Dairas Dairas_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Dairas"
    ADD CONSTRAINT "Dairas_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Dairas" DROP CONSTRAINT "Dairas_pkey";
       public            postgres    false    212                        2606    40973 $   DechargeArgents DechargeArgents_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."DechargeArgents"
    ADD CONSTRAINT "DechargeArgents_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."DechargeArgents" DROP CONSTRAINT "DechargeArgents_pkey";
       public            postgres    false    235            �           2606    32797 &   DocumentLegals DocumentLegals_name_key 
   CONSTRAINT     e   ALTER TABLE ONLY public."DocumentLegals"
    ADD CONSTRAINT "DocumentLegals_name_key" UNIQUE (name);
 T   ALTER TABLE ONLY public."DocumentLegals" DROP CONSTRAINT "DocumentLegals_name_key";
       public            postgres    false    233            �           2606    32795 "   DocumentLegals DocumentLegals_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."DocumentLegals"
    ADD CONSTRAINT "DocumentLegals_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."DocumentLegals" DROP CONSTRAINT "DocumentLegals_pkey";
       public            postgres    false    233            �           2606    16518    Employees Employees_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Employees"
    ADD CONSTRAINT "Employees_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Employees" DROP CONSTRAINT "Employees_pkey";
       public            postgres    false    222            �           2606    16596 *   ExitAuthorizations ExitAuthorizations_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."ExitAuthorizations"
    ADD CONSTRAINT "ExitAuthorizations_pkey" PRIMARY KEY (id);
 X   ALTER TABLE ONLY public."ExitAuthorizations" DROP CONSTRAINT "ExitAuthorizations_pkey";
       public            postgres    false    229            �           2606    32780 ,   MissionDestinations MissionDestinations_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."MissionDestinations"
    ADD CONSTRAINT "MissionDestinations_pkey" PRIMARY KEY (mission_id, commune_id, "createdAt");
 Z   ALTER TABLE ONLY public."MissionDestinations" DROP CONSTRAINT "MissionDestinations_pkey";
       public            postgres    false    227    227    227            �           2606    16550     MissionOrders MissionOrders_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."MissionOrders"
    ADD CONSTRAINT "MissionOrders_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."MissionOrders" DROP CONSTRAINT "MissionOrders_pkey";
       public            postgres    false    226            �           2606    32776    Pays Pays_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Pays"
    ADD CONSTRAINT "Pays_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Pays" DROP CONSTRAINT "Pays_pkey";
       public            postgres    false    231            �           2606    16509    Professions Professions_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Professions"
    ADD CONSTRAINT "Professions_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."Professions" DROP CONSTRAINT "Professions_pkey";
       public            postgres    false    220            �           2606    16486    Roles Roles_name_key 
   CONSTRAINT     S   ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key" UNIQUE (name);
 B   ALTER TABLE ONLY public."Roles" DROP CONSTRAINT "Roles_name_key";
       public            postgres    false    216            �           2606    16484    Roles Roles_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Roles" DROP CONSTRAINT "Roles_pkey";
       public            postgres    false    216            �           2606    16537    Transports Transports_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Transports"
    ADD CONSTRAINT "Transports_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Transports" DROP CONSTRAINT "Transports_pkey";
       public            postgres    false    224            �           2606    16539 &   Transports Transports_registration_key 
   CONSTRAINT     m   ALTER TABLE ONLY public."Transports"
    ADD CONSTRAINT "Transports_registration_key" UNIQUE (registration);
 T   ALTER TABLE ONLY public."Transports" DROP CONSTRAINT "Transports_registration_key";
       public            postgres    false    224            �           2606    16495    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    218            �           2606    16497    Users Users_username_key 
   CONSTRAINT     [   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);
 F   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_username_key";
       public            postgres    false    218            �           2606    16453    Wilayas Wilayas_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Wilayas"
    ADD CONSTRAINT "Wilayas_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Wilayas" DROP CONSTRAINT "Wilayas_pkey";
       public            postgres    false    210                       2606    16473    Communes Communes_daira_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Communes"
    ADD CONSTRAINT "Communes_daira_id_fkey" FOREIGN KEY (daira_id) REFERENCES public."Dairas"(id);
 M   ALTER TABLE ONLY public."Communes" DROP CONSTRAINT "Communes_daira_id_fkey";
       public          postgres    false    212    214    3296                       2606    16461    Dairas Dairas_wilaya_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Dairas"
    ADD CONSTRAINT "Dairas_wilaya_id_fkey" FOREIGN KEY (wilaya_id) REFERENCES public."Wilayas"(id);
 J   ALTER TABLE ONLY public."Dairas" DROP CONSTRAINT "Dairas_wilaya_id_fkey";
       public          postgres    false    212    3294    210                       2606    40979 /   DechargeArgents DechargeArgents_created_by_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."DechargeArgents"
    ADD CONSTRAINT "DechargeArgents_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users"(id);
 ]   ALTER TABLE ONLY public."DechargeArgents" DROP CONSTRAINT "DechargeArgents_created_by_fkey";
       public          postgres    false    218    3304    235                       2606    40974 0   DechargeArgents DechargeArgents_employee_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."DechargeArgents"
    ADD CONSTRAINT "DechargeArgents_employee_id_fkey" FOREIGN KEY (employee_id) REFERENCES public."Employees"(id);
 ^   ALTER TABLE ONLY public."DechargeArgents" DROP CONSTRAINT "DechargeArgents_employee_id_fkey";
       public          postgres    false    3310    235    222                       2606    16519 &   Employees Employees_profession_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Employees"
    ADD CONSTRAINT "Employees_profession_id_fkey" FOREIGN KEY (profession_id) REFERENCES public."Professions"(id);
 T   ALTER TABLE ONLY public."Employees" DROP CONSTRAINT "Employees_profession_id_fkey";
       public          postgres    false    3308    222    220                       2606    16524     Employees Employees_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Employees"
    ADD CONSTRAINT "Employees_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id);
 N   ALTER TABLE ONLY public."Employees" DROP CONSTRAINT "Employees_user_id_fkey";
       public          postgres    false    218    3304    222                       2606    16602 5   ExitAuthorizations ExitAuthorizations_created_by_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ExitAuthorizations"
    ADD CONSTRAINT "ExitAuthorizations_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users"(id);
 c   ALTER TABLE ONLY public."ExitAuthorizations" DROP CONSTRAINT "ExitAuthorizations_created_by_fkey";
       public          postgres    false    3304    229    218                       2606    16597 6   ExitAuthorizations ExitAuthorizations_employee_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ExitAuthorizations"
    ADD CONSTRAINT "ExitAuthorizations_employee_id_fkey" FOREIGN KEY (employee_id) REFERENCES public."Employees"(id);
 d   ALTER TABLE ONLY public."ExitAuthorizations" DROP CONSTRAINT "ExitAuthorizations_employee_id_fkey";
       public          postgres    false    229    3310    222                       2606    16581 7   MissionDestinations MissionDestinations_commune_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."MissionDestinations"
    ADD CONSTRAINT "MissionDestinations_commune_id_fkey" FOREIGN KEY (commune_id) REFERENCES public."Communes"(id);
 e   ALTER TABLE ONLY public."MissionDestinations" DROP CONSTRAINT "MissionDestinations_commune_id_fkey";
       public          postgres    false    214    227    3298            
           2606    16576 7   MissionDestinations MissionDestinations_mission_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."MissionDestinations"
    ADD CONSTRAINT "MissionDestinations_mission_id_fkey" FOREIGN KEY (mission_id) REFERENCES public."MissionOrders"(id);
 e   ALTER TABLE ONLY public."MissionDestinations" DROP CONSTRAINT "MissionDestinations_mission_id_fkey";
       public          postgres    false    226    3316    227            	           2606    16566 +   MissionOrders MissionOrders_created_by_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."MissionOrders"
    ADD CONSTRAINT "MissionOrders_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Users"(id);
 Y   ALTER TABLE ONLY public."MissionOrders" DROP CONSTRAINT "MissionOrders_created_by_fkey";
       public          postgres    false    226    218    3304                       2606    16556 2   MissionOrders MissionOrders_depart_commune_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."MissionOrders"
    ADD CONSTRAINT "MissionOrders_depart_commune_id_fkey" FOREIGN KEY (depart_commune_id) REFERENCES public."Communes"(id);
 `   ALTER TABLE ONLY public."MissionOrders" DROP CONSTRAINT "MissionOrders_depart_commune_id_fkey";
       public          postgres    false    226    3298    214                       2606    16551 ,   MissionOrders MissionOrders_employee_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."MissionOrders"
    ADD CONSTRAINT "MissionOrders_employee_id_fkey" FOREIGN KEY (employee_id) REFERENCES public."Employees"(id);
 Z   ALTER TABLE ONLY public."MissionOrders" DROP CONSTRAINT "MissionOrders_employee_id_fkey";
       public          postgres    false    222    226    3310                       2606    16561 -   MissionOrders MissionOrders_transport_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."MissionOrders"
    ADD CONSTRAINT "MissionOrders_transport_id_fkey" FOREIGN KEY (transport_id) REFERENCES public."Transports"(id);
 [   ALTER TABLE ONLY public."MissionOrders" DROP CONSTRAINT "MissionOrders_transport_id_fkey";
       public          postgres    false    226    3312    224                       2606    16498    Users Users_role_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public."Roles"(id);
 F   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_role_id_fkey";
       public          postgres    false    216    218    3302            �      x���Ksɒ�;F�
�t�����3�Tz��k'�Y�HY��h��_|-ϤjwcE��n;�����������x��q��U�*����ʫ�]������u��>��>%��}z�FP��?ͳ6�R����a�����ڥ��.�<!�X���S�R���!!�Ҭ�ǧ�ݸ�?o�J]�@�O�����a�5���S
4�6<<�� ����ʊ&!�~��1�kq-PQg���&��������ԅ@
4�=��xNaںVH�X����tN��2kk� R��1�)�Fq T�vN|[eY�
	�z�#>=��y����x���SV�Q�Y]?ƍ�ruUuݩ;�L��~���>�i��HH�t����tb�-��L�	H��?��uA�d�]ey.�@�����@ۿ�M�ʺ\\�@S������f;��v�RмQ=%@���x\�������-E#�h�vƉOL�UY��R
4�{��f8�%�NU5� ���l��O[&U���bH@5+{���[�����Z��!�ծ>�p���'ޖ�zT��Ak��5S���l<LH��h�7q�gӪ��5�zH�M��G,����� ���|X�����:+�@	��F��}z�'��5!�S���ۑ�4�����4�"���h���GkO1+�B� V�n�#�I�2�^)�27�y^�|��Dñ�=W)�����8��1�P���K	�n�1Nw;�R��H(��p*_��]S����N|x��e��7q0V^cݕ��(��4Z��4�X}�����F�5� �DU���"�%�J�;?<=�N��$/2�)R���a8���3���$�@�\��|����):�P��Ǚ�q�#��ԏX-���t�;�қ*��߀hʇ�}�3	�K�(d~�ӆ=���E'�JF�34�8N���?�.@��9�O[�4�
%�AӨ�%��ջ�������mr�^!�R��z;�[>�^�܆I�  �~x��x^�_��6I��%k�Fz-�j�}��;J��p�|���./��O`����gt{���6�j�S
4�Kl��n7��[l3k�		��}�hnԫދRț����������h�R4(��xL��/��)�ռ�H�_6��#>ն�O���) F�q�b�Y��$�*�n���OI|íJ�� �~�;x �W�*�@)�ԯ��˘���Wc(%����S�8��>#�]QkfH��F����~��R7�HW�R�)��M|�ퟞN�딌�g+���ݰG��Q�\���H������0쓬6W�X�l4nwc���r5�P��y������V����V�w�`?�0}�f���9��f������D5������{̑��e���)�Ү�?� d3��e�
 R
4���FwDM��<��MцB�E[��B}��M�&��' 	V�zfJ�*�շ�㷨z��(U4�R���pz�1�@��{�]�T�	��Z�n���bO�c�Ue�;�Z���M�%>��B BK����/^���̍�2��PsWJ�����G�d�i%�Z�������n��UWK)�m�m�	�ݎ�)-z�S
4��x��.��U�d(*�{g�xz��mL=�.W�GJ��~�}�F�?��Qn=�@ӷ�4���$�/�%A�\�x���>KI�T>�ُ�U��mZ,��R��7�����N]%����1�וUJ����O��̣�mHOH���Ǉ�S����~�?�����u<��A�/z�/P2R���O��7ח�J)������B�zU��jJ������_�4	�s-�T��>��F�rc_��J�!��0��4I��{��7��>F�\�S�}z><�"_�$��$:J 6���y]�3��h����<B6>�{��hz;0so� iSu�hz�{?q9����ߤ:cJ���|����<�j`���� �W_��ݐ�`�:!��5���.�ܼz�aB�4w�Q�z���",�W���y��	�
�]�����҉�{��V���X���<>lb#��k��z-��O�Ÿ2L���e�M��3]׋aM���.:ًh�~8m�SS5)�0M�C�o�7�K�K��!�e�q�ఁ.N+�뺼��,R�)�h/�4�m�eA��قM]|� A67II ͡.�%Q��U�E
����5��m{yk�M��<Ҝ�n�"�Ӯ~X���8���/��l�׍M��P���.�[)��v�n���PX NH�j�I�3>0n�\\���/��)���+\P��<�X_$`�ջ�������Y��E��9	N}я_$�а� �~�����"�U�K)��6�<=��)Nq�;�P>���<<�ċ΋�b�a�M�ڴ�������������莀�������0m�k�.��iU^L�Y�@S~"������լ�Y>�4��tbs�߃�5��S
4��@�$����"T��FN���˥�qcgB
4����ݭ��C��N�zo���$����j�M?���`_H
����	 $ 2����1ɪ�X��=yq~���	B
4�'&j�}�
)���r�;�9#���0�Q<$J����a3ܫ9�E�{��)�s��Gb�U� &/Ǥ@ӷ�9R�e���ݬ�a�{����S�^]���վ��5�w/��W�)��F���������+k�$���X��)�խ>����-�0�Z=-H���ǃ/�hL]��R�m���E��9��3�^Rƻl��r�Ο_L��p
O���m��'�<ڰ��66�KH ��	[>��sz\-X�I���&/���	��z:8jW�r��ȼ�yb���-	�v�D�����z�����@ӷ�w�j�R�y�nR���~����E2N��>�-�����C��N�Gtu=��WT�[��@��{�Ii�C	��(�a�EϤAy~1�o� bl������Y����K�H���'ן0%��͓m��&i���9�:Qm
 �����䷈��V�De��Q�R���2?�1	��G�H ������ö�rYU*�C)��S�؏hR��%�<���u�Ve� ��Mّ� ��cgK�>���.��,R���a��
&8uR�Z}?�#�W�{J�������y�u��(��7�~��@�\��z� �rY�7"��!��ʋq�Ei�i��5��$�A�	���a?"�ߖ�]���̧E
4�>�~��Qr��Tn��n�3A1�Ju��@Af�y��͋?�R����h��R
4���_WL�Ӥ<W�F	$�]�����s��Dȟ7j`�h�."u�S��P��@�w���4ҿ�$�D#�v="u�����QsxJ�����x���f�6�^hZ��X.��������q�R��j.�{,R�){��oN\t֬:S�+J`�L��i��7&h��(�f����'���^y��Mm»��x)AM���� ��L��&0�l��A8���8%/�v�Z!�Ӭ�q�G}���E
4}����$���mgV��V7o���1M��	�~�}�n��NrzٯA2N����&���8�?�:���e�)���_�	����b��"��{u�$����E����>n��?T��)�!�?$8���)�3�W��|��-+��i"��u�����R�%`:y��<<s��Mm�4��9�1��������r�겒�8�''�[L�.�c�;��)�~A~8����.�㪐	R��[��qNjL�.o�\$�
s*wq{�E�GQg�	�h��/�)��T�+�,!����	Lw1av������x>ǟ�3u�M�"g�M��x�.&������)�"������k��5�Z��j�����X8����Xص<�_I�1u]���E2^�Y�z���x!�c�}<��F�&S(���N�M�s9x�@*WL��K��Q��r�Îɻ�Ze�!_-�S
4�Ɠ�˃�THǋHX���~�-�/�q�$�s�/nrY$ љO{�����ˋ)�������cR|����د�z�j��i�j4�@SlG<$1���L��2`dP��\�@*<���&yM���(����Ͳ����Z����@�/#w�ʷ�f�r(�b����!5d���N���    ��w��h�W[\�m_�@Sn��Ф�mq�b�"�~�>�)�)35դL��yz�X�Mp.g�.�qzt�����Vl?]�@�[d�cRA��r��Y	4���-{E5{5�\�5�M���#��	V/�X���zȮ>Zs��+$vۑ����ݴ		��'=<�{�Dfc�l������Ͱ������6>\Lw_�@���1nO�����N�q
k[t%�j��r5�h:�U�#z�.=�]���]7ol\c�S�W���Y�h�1�@��7$.
{ DC�\����e�ӪGJ�������=+v"��F)�tɂH`z�� ����!����5�@����c��Y���{g v��H�Hb:���$��3&:��;��T� �@��v��}�)6r�E�0�g~{:pb�@��ӧT�KCX����SKm][&�@���W���>EM�:5��Բ�g�5TՓt]��AJ`!v21Ii/nZ[$Pj�u7q�߫ ��B� j^�r�����OJ4�>�U?I)�Ժ\���S�B��Q�;�+D>�S��r��E
�|`��N-6�L���M������j�F	O���N>��R��R���=��5E�Iz��Xˏ���|@꯶)%���a�k��?�D+�6g�� ���}�Й�t���P^Ƀ���<$I�	�R��fO���0�}uq��"�����t	�̦�b�W�(R�<�2BB2Ti��n�f.����<�K���R�黑8}Ey/^�K��w6]��;+J���8%�]{&���*T�K U���n}�'o�be0G���3�M�G�
��hP��W]�a���_#&����Fx.��[,OG,Ui��ĳ��ml�����M@ޜMC�������q7q���xs��R�Ѫ� +c|�=�쓟�Y�<W� ���9��Isi(��LO>HL��>\f�O��~�v��]�w/��I�	fr��"�V��v_u��h_�z� jV߰P���JGn���"(����v���m�	�X��T��^oO��
XL>a�_wqo#�	�٥@Sf�>O�)P��g� ʙ0�%Ɨ�%��E:�K@�*����tDٚr�%$��i��K�X{�D��~ߩ��R�钄�k����.n^$ଝ?1�v�r~Zg��S
4�[�	�X��L�qݻ��Ȇ��b�R���8�p6&&�9�d��R�)Bs/\$Ҡ���Kj�o���L���K��)��T�g$8��1]�X����ja�%��՗���F�:H�j�(�H���M E�%P��gTL6�"�� %p�Տ7�s���cM��I���7uu���(�ھ�]��vL4����@C!6���	��c�G�R���f�#x�]��ߖ�X t)ДE�'l)�7#�fp��լbL�>�4h�U��(H@�O�=�M�'T��(��?�p��k��&�Ԣ���@S�y01w�z͵�uP
4}?L������bi��@ӯ��4�9�
8�NK�;l-B'%�t{�b�"��n7�P깪�$�@���~���U����gV��OH�����i�:��S�u��BB�=.���IsL*�L �r���廟S�UʹG�S�=x�J���L%&�N���q��n�4�[|M�@�}��%M������P�����x�%kwh)��4̓bI*2�:PiNH�CP�T��H���q����x�ث�W�b;�K���Z8"KNY��%prP��$��Ͳb��n��ׇ$�V�/%p����tz:��JYg"�%p����G?«ba�~]�h�K���#�@cDV@��uy����8uM��#J����^a�:���,�>M$�S���2!����61a�M}чM��m-�\
溲i��>�Ov�X�v	 ��f�����G�0T ��a:�\{mr���AS�W%U\
4�Ck%H�9B�Z֤Ol�Uej���݇����3	R�FJ`5�'�ב{��VY��SJ��ׇ�;�4ƺ}�n)��U3_^b�Ԩ�H�̟��Ho��EGW)����3���m�$�R�!%�|?���_����*Sjk�K����B		��|���l�&�Uy�T�"�޼9��6bG4�.���M'�b]
4���y��c
Xb�K 6s!b�qg��+�fҪ�R�)��[�m���P�%�Pe���^~ ����R�)��OS
ӨM.�`�~=y=�I���,;�H{5,U��-q)��&>츳���y����h:�μ��M+5�Q�Z���.$'�U�*?�h:��ǟg$��|��"�լ>���L^���C��ur̞=�Z2�z�'֥@SF\o��95�W}�<(�������E�WՉ�O�Uf6�~���+����J-�Q
4����(Uq�%��y d��&�W�H�@*W��Q7�kN��h����3�/�(��3ϜR�)W)�3�`�bP.��GD���w�zG���(��7��ن&�'h*��%���;.>kR���R��f/�C��4���d��nb\��IH��L������9sF~ʵ�m1ZQ�X}�4&94Ե�PP��`��!���Z����U�)���.�X���Q���f 	$� ���jP�'%���-��Ӫ,������ϊD�L�f�M��,��N�l� [2lo��4�oes��2�eq��9r���T}�M���KШ^�p	(��_��]S�R^$PJ_$ܧ\��{ٵ��v[�K���#�L)Д��^"�K$P�ʲ�TãS}��9��)�Ӯ�G�N������ZE�h�}�}�Z�	�*��h8��y.ƨA����@M��2�#�$@��a����{pT��T�Z hj�휂�P�� �O���t��(b�O��II�2X8)S!��)U�M)���4�1��U~%`����qb.Q�ڞ�P�R[���8���6U�K)�]�h�����>�p])�_H��֣l�i���-�[�{%!�t�)�_:�2A���g�j��^�_��r�,W7I)�gl Itm�r�]
4�>L����%�=BT��W?q�;o?�ӯzS�\�ߺ�_�e���Z'ie�K�M����7|)^��!�xh����L���F[\>_}�My$\ıA�f%Lu�P�#:����)LYȻ�P�kc�l�m����h�1���S�(
PJ�������ƨ�.���<Y7���(��k�z� �p��*�8�ͽgW
����jX[�����O���Q�ԥ@S~"���IP�� %������u�,U��%c��q'�����c���{R
4��ؚ���j��@�5��4*M�(���%1�G,��ұ�3+{H���l��IИ��O�]$�j)��%ScL�?��?��Y݌/7w�j!��d�+�@�Oۿ��5�gOE|:�2��m�W�lŹX-�v�\��hJ֏��qL]V^$�PdY���x�>�Q,����H��Q/_]?�\���(�������Bm�h��^�=B���T`\Y-8�0�� U@�%�*V8[}sf\8S! �L�i�����U���)��*�o;�c
�F^�1/��I�IF�RB)�ӭ�_��{�DR�^�z��O���й���R�̠d����_���4j%�8��O��j��?��+]C(��o��0������S���t|z�%9�Z�NE7�<�ې��P[1(T�l��.���n��S�}H�J(��sş��%��S�)�Yʇ8�S��T�%pP�p:��1}E}�\J �K�v@P?K�}�*(���n�f~N�TUY����������X��r�P�ܻ�>uE:�0%SPD��E�C!�L(���������.��1�CS�*0B	�Ɵ��Ñ]��X�S�ٔM?m��O�ԳeJVu���Ek�����Q�~�rM)��z�ST�E \=ƚ=KIW��;H��d�:~.���BWr�J�$#�@b�q�� ���@)������<�Fժr)��s�m�#+o�c�W?x�;P��Hw�wo����5����'�	\�)ߞ��1�V5��c�V�uZJ�u��8����2�H	�~u��k�6�f���GJ����>�W���08��&��՟�\#ѱ�P�Y¸G�y���o#��3]
4�t8���>*r�;�@    �^��/�_ܱ�p�%�%���	��\T�ɔ�(��%`Z{Y���]�$U*�H����8�IJ+f��z᣽~����(2���I��h�ib�t
S���K��Q/�c��y��4��M3u��K`r�y�L��E4�ύ_�@S~�����o�_o���ūy}�P��̪=�K��抡@�?��L�^�B��z�ij�ʼt	�;�Ώ�t��P��c*��H��x0��O�T��K��5��o��j����B�]
hd���0�5kD��%�r�j��u���7�s���XL�}����ת�T��h���0�O������=-�~N�ߟ�������.Ĳc�"!�J����.>�&uj���Q���yS�WVjܢ����]<[�tj��Ib/*��'��"i�P��"�Ԭ֥@Snd@�8%Y���K]�\{,P���՗O�_$�rfJ�U�����.V�N���Uv� *�e�S�*7�%�*nt��?��m0u)��S�P=jا`������ش3�(&��������b����mİ�R�N�?	H�����4Gmlp	�~��&8�4FmOt)``��u���ZI�9���M�q�L�z1w	�C"J?�I��"pJ�'|zt�UK�%��n>��6y96ԩ�N�n*�Q�~b�����Ϙh���$0e&o0��Nc#"�T a��5�OI�
s�R����"bw�+�TH�%#�k�p`؃��Y���h���36ɩ�Y7.��"[���O�)��C��]����0jT�� �^�=��,��}8�s�0L�߆�y��'���QA.�M����(�/�P���	�iV�?��?����7􅒰^�x� �Y*��E̕ub&X����l�0}��b^�50�&���G��	�>i	mj?�6q���Y��RJ�����	{��$LEd]��Qf<᤯�����c[]��>�a��M��2W��\�%�C�$�dJ �0Q<M������T�(uf�K�A��?Q� EQ�Y�@����!�cj:Q��U�R�`�$�G���b���^�.�R��Ǘ�H�J唹�^�4��k����Ht�ߎ��hN]I$pJs�A�O^�4��j�K��vw��5�����%�^�ʼ��5��5�˛��9����
�P�Ł��ޞ�-[��	����m�1�\�|�R�K���&{���:U{�%cي��3i��O^9xe��x�h:�m�l+W!p��W,H�������G��h?o�r�K���Y���6��2�W�%`���g|���$�B>.�T/y�ߜ�٪�h�� $��q�fJ ��),���B%"��p����TE-��\�-�3F�՟�ˉ柫B.�zm������M�֨E	�|����S�*WshJ ͇�|����/Fy�U���p)�Կ���;S�^�z����^W1A¹d		$k�Þ���?T��ձS.�~g�T��iR���.��$��)"ژ��jx�N�= g�����K ���-/Mql���HƩ�Տxw�aO~xm'�mH��ཋ�=���\aJ����]���s��\yj�o;��n��^hp	�
�e��Ĩ�٫?�@Csʹ�"��u&v�S	4DQ1|�;do���ky��K���-����C�8�jķO	8z�rR�Z�TJ�����J�Bէ�`�:�F�#����R�B~��Mю���?X����X<i|�M� Y��%`�i�ĸ�#'QY�I%����7���֫J��8�f�-�|R�/AG�� լ���C���ԪX�@CD�U��M��J���R�)�"D�^F�M$���ԁp��w��p�p�32�\Thf�H?�MY�f�_{���t{S���q.�����\kd��W�Zq	@=�;�y]�:��%`��nTK�g��)%�x���ץv	Qg5���d2N	��z�@�<�F��R�)�0ԁ��_�;�~L[�Q��[A�O��Ll�t	8�*���E�\�u�&��M�z��U2�|F���J��j�ZW�{E�n�=�M=N���S,NH`��;� `��A�΃v)����*9e�&"����Av#��o���(U=�M�i��%IPUȏ@8���-F;pV��ɚ(W�)��m���׹�V)�~�Ea����NH�����Or:��B	�|2ݾq�D>��R�eJ`1�<w��O0|J=��S!{J@���1�%�f܌���b+�K@V+��^��]�i�|0J���%��D7L�K�Fs)�t����B�.WK�@�D�e��� �j �:���@S�ߺ�ى6U�=J������{sN�ڬU�(J�ˉ�6���.Wغ��w������Jyh��?V��=/4	jU"%����[d�iP!�X� ��=����$��.�Ts3�n�{rj����J)�z�U"[)%@Z��')e��Ք@��i����@ݤ�Jl�r	,�b}�$:��T��\
E�e����T�rf(��83��f�t�L�T� +8�g2��ں�	8�껹1;������"�T�$yї���l�uUC�h���x�Q�Ք�,�K`aGҸ�ٸ��5	k�M	0?�c�n�9iV��к���2,
�'Զ���S
4�'n�I`����l$���D�Beӷ��PZ�P�|)�gs`|��j�O	0F ��	�g'jm�F��)Uz���u��R��:�/�'K=�����@ӹ*�c̔J�5���g�M�y�m��8�h:/�54��c�~H��u)��ݰ��R	��7(�,�鮱m>z��0U+�%���Y1�x�׽��(���RN�5Iࠀ����δE���a�6#��N��P�:���$�Y��E���+{sL�Mp:�E	$�'�&�&Ae���)�]��x��>�ج��jGe+��@���"Ƴ��"��o�*��R�����S-Jb���%?���/���)ɒ�J`�@��a���(��eH�R�)��W� �!�@�ݵ?���4L��P��x?7-�B����c�M1C�qAr�L�uHజ�՗�a�tX�ĩkd6�@S���VM�d�%��el����{a��Iݔ���ܠ0��b����(����k?�C{
]�Μq	�����=�	�̦�R�<~��Yt��!���/l�{����Tqs* U��s�I��k:���-0��;��T����A.�z'�vN}ְ��0H����������c�\����ȬW?�5�@S&�Y�<S�>�U�B�X�߇G�K�Z�E�`s]F�7�/Nj���+��(������y�6	��RJ�����xNa�DK�L���Y^�Z+��Lm!�h�,���.n��$�VC;%���/s��PK�}٩�	�@�d��\c���D?G$���4��u*��hs�:�qL��Z��䒑�l)��2��Vz�7�3m �s|���f�o����@S\q�R��Q'D�hj�vxAXQ_S��ns	�e��Ǹ��(��U�%(`��(���ãoe���e���������'p23�R`}5/*>��F�G��\��)�~�������_�@�[�ԁ
.gތI���^��=�N�Vv)����_������[����2 ��� �=׺�e��
gQ�����*P�J��_���Z�n���=��>'i��^�T�[��Ŗ�2�5'�ALb���l]�5+ܐ��'�Y}�����'�wb��8�:3�K�����J�n�c<�ރX�ߪs@\
4�C1�3�bɳ��R�H��\�����V��.��~{��@Q�ʅ��R�)����IN-�|��)�:	�O�Tb�K U�ϻ�֘�7��V�.�V�m�x!��kud�K��ܩ���/)T�U��jy\,붾c�"��`.�ح~?������[U�%p�9o5N����"2������Ňf�Q�j��"٣:�+�|�Y'R� T�ޏ�{V�x���y0.�~����~�z�g�S���Q��mӈ�4����澟O)W	�T��������1��Ƽ�S�D�$�&)�ڮ>ǣ/���8��6���~c���D>�YU"�Υ@�yf�}.RZ�bk���baѥ@S:�w��4�:H�>)�1����    4�TC*�p4�+���8�V=ǒ�5JV�E�u��]1S�]
ܫ�ɿ�P,:�R9��<X�u���|���V��w)��ZV4ty�|ju.R�]p>@��x����@���R���f��L���`��u	bhVS���R�Vbs�7�!����j�����c���Ю�]
4Ŝ��y���V��v	�r> �h�����N�)�����q��t)V>�@Dڨ�������AM��,)����[��OIR-�$���l'kvm,8���$Te
��5|{�H�T��������hz��j�҈eV��Rd^�s@;n_a�E��Ǻ${�+,�r�������S~yn�ćT�1��Ǵb>"ɜ�ݗX�,�b)�@Û�8p��� ��F	�z	��m�U���.�լ�aK�a�n8,Kͅ��F%��[<���IN+q	�nj71��r5	��GBɹC��U�|T��Sfs�<쯮7�݄b����@Cz7���X�,�&���@��<Ak���p����p�R0+�QU�\��{�V�fӫ��]
4�y:�����qA�C�b���\J`"�w�G}�@��(�"��b$@�rǠ ӭ�혊Y*W���.�"��uR�B���{Q�l?��PT��%�rd�Ƈ]�v	�9���R$�X�U�{(��_��i}�*��0���`������X���.�8��L���q:����R�a�"�b^g\v|e]���K���o�i�����*�R���p��,S�S�t�@�W��l� 'H�m���%��U��^���R��w�4G�sp	lPũyH�W�Zg�2�]
4]�G\���UjأX���Ra)D��X�s)��oK�����)%��O��܁��K��:ԥ@ӿ�Rl�W2nT1nC��<O�iJ�"E�����1� ��\2,�$���_�r�M	��;G��)�RDŢ�Z
4�:��>Ω.�*��hjo=ۖk��@Y3���A
4��qߙ��qJ�J�R�^}{zd���U~%`�G.$�bK���X�t)�t���o68 9EkԔ�h�!��R���*+�R���3�%5B��Z���d�����RY�TseÙz+�M=���ݢ���%�
�*�����ɫj56Sj���ct`�~Mk��.���H�M�^E���n1�M��z?`�'� �ժ��X������i�(�Du�Ȃt	�vy��p��\UרEhJ���9�߳;Gv<�K����2S�~���Y��K��2H�#a������&���%���V��s$�x1�Ә�H�L.�P����~7g�^Vu̵\���\C_?�քS$�{M$ߺ�mx�y�ɐS=���e�Ow�Bf]��\
4��"���wAV�.�`H|?�1�@e&A� ���b@��.�w%����9�I�Hyw�X}�u����4C}B;:���	 ��W���R�X*P��}�$au�"�� ��y������4��}\��/�G��@�dj��XLÔ ������:�i����B�����(�M���-�P�Z�+�%���w���i�Z�D)�����-��(1��Ԟ�BQes���~���a?��t�R�)��M\�K�d�H�k鎝���i���P��3�#U��׽r(��mqG�9�n8��)�����1F^�h=M���f|w�W�C[�iD�N3sU��%0��oO��9�X�JEd�\�(q)�tN.�+T*���r�E)��><��X�
�6=��W�M?��C4�"9(�W��-	)���ͽ9$1��+E	�beC�𐢔r��(%��^Ɨ�ף�F)�l)��:�|F�&U��+P�^݌;�4�S1$J�4�rx2p�R֚Z&4R
4Ŗ��7�%H��S	ᚸA)�H���S	���G?b�G�گ;��I)���x`����R!!J��>�/;�,C����|ߏ~zm�'����.�έ��U!-3�T��R�鼕���q��^��S�İ1��$Y�� ���~z�ϫ���М8�-n�4JUms	���e��<,�RK%m����h����qY�r�vB)�����4�W�7j�J	����L�U����9_Z
4��q����v{h�i�\��`��ajd���W2%�0Y���$ў�R�g�R�)������Y�(��Xpc^��s9�
5�P3�����Q+���x"9��rXZ=ʴ�(S�<8��R���(C�HU����OBU*��mJ�S
4�F>�$�S�
J�	��g�J5���唀b�;ʏ��'�T�Ѷj
F)���*�S^4�S�W\ِ/���4jZB	��(؍k�Q}&�eH@���6�"^����W��h껍�]2A��W	�~�y���}/Y]V��dJƪ����MFS��e�<@�@�� �\Ш\��r	(��f�|��ysPU'N)��ঢ়h�0k	�W�e�bI�5�+Zs���\�X�*�2W�:�@S?�a������0-�Z~��ا)�ܸE	��2���/H�+oŷC)����x�ݷK���֪��Km2@���3�	��rS	��1g;'A��n(T���I9=2�I70�����������cը�+%�欙�1�3		ke�`����T*7�k��)��Ԓ�dH	���E�H����u�x8��C�S{��D�������q#�zJ��\�p�P�����	�n㽷��ʾ��s�I�z��{o�曾��kj�n�g���Q
4]�e>�@�vd�Y�B/�M���J^V���v	�zN��1w��&��y�b��Mo�K|�p
bԫ�N	 ���#��Ә�W�:%`ح_��=�h�/�uܥ��%-׆zoVW�*N�pXLe�ZRkH��fGdw<�E/#�@S6̫߷[�JX�
й*?��gӪ�%`~�@��v�+7�R��m|y�س��� %p|��l�\[҃*����q���
���t:���WS3��-�߀h�:$H�j�UQ���/�]���'$�a��.΁K�0t`��{f���i�*��0�{\�l	��n?J ����Hd���<�����{p�8���2u0�K������$����0(����ДK��\����Ӗ �� �=��Cf�8�����*W>Q�fT?���	���Q	E�eX]����v*`�;n�g77F�Q��\���W_y��O��A/���ܰ�pR7���2��R��.Vq>��ZDU�ǭ�T\
4���&nwc�U�½p	�c��l��qmHTY�?��P�.JȖQ�Y�6\e���J%���0o"JP��mX2�8P�Ż5�U�\2N����4E��.�2W����9Y-v�UY��Js.�����$K�S�ּ�!��W'��X6�oծ0I��b�����A
4��b�����Y.��@�J��.�۲�:]
4� �ߠ�� �K q��<�Ge_R	<�5==���G�m+�0�h��6�]њX�x�K ����E���^6:J�������)*��(E�>=�����~	)�t.U���nF���?��O]��$��!0G�G�^���Z����yݩq3�٬T4�H=sH��<4�,I��O��׋��r]	P�A=A8�t����HPS�}�.������^��\l�ag�g-�mdk�hzcӳ���8"=J�� �Ͱ_����ͦ�7)��;	���K��4����6����J��%��)�k��"�K��<��w
HRa��P��쎾o/A�Ĭ�%�a_i��xN�TE:� �Q��GL��TN�ϜR��͛s䆭�QS#J�Xo��Gz�8FB=H�T�i����'$�@�9�c�>�Q�{.��U!�~��Dl��PI@]�@��H%c�@Ԋ:� �X��>E�T�=�@�{	\H7ktU#s�~]���Z���y>#N?w�|������-�~jS��{��qR
4�u~�{X8���h�A�.�~��01�8A�D��K �nꉥQ"��
@�R���G6	�
u��@Û��s�z�Bw���VyӔ�jW�g�y|H�:u�K��J��$���
88���^��0Ѫ�UM�Mq9��E�j��A(��L��8�EHj�S��i�����WW��xx�/	J��*�F	�ru��ねRs�A�    .��X9^�z5e���\
4�m��C���"e�%`|���H�ԋ�/�@j���aN��UH��[a]
4�̃�<x�#�MtԔ�R���]{yU�-��V����."_ՆQB�[vn�X��1��� R���,���T��f�	٭�w��S֥e(��O��g��Pݪ�
�@S��G<��Ψ�x�*�yfd���i�G)Д��c|z���ժ�}\�[�*�� �(%�����6��+����l-[A���y8<MC
�IW�@�$�+�ȡ�T�}���3������^��0��Ow0	Vx%����c��x?&�����.U[2��Fԝa	E4J�461�7��TY#��\f>��y��K��Ty�r�M�OO�WjJ��gJ��+?�SCl������Y����M�RɾT��yԊǙ�2wE���u�w{�E�>���j����\Ju��K���~ދ}%.�~N��s
��"!S�~�S�S&8*w�%p����*�~Du��A�@j�§����jy��&��mjr]�*�.��i;���N�6M��M����UҲ�\�uu)��/�E��H������Zv86h��jc/+�&h�Ub5�o>Zx��]����P
4�ƅ�xN��N� �W_�<���Jŭ�>S~�M�ꑇ(��z݇�<��Kۺ?a$p⣭�L�_�M�"a���k���T��h��u��)\�+����r�?t�7�ˠ3%P^�<&)��K*DE5*@>��T�a�y�%�J/T�IS�)W�@����4�b�1�2Y�H�O/��o���~ڪ�@J��s�q��AV��Uj�K��{&Ɵ�[���?�@ӷ�y7r+lԫY*%�XF�ϯ''����Z(я$]�>O�R�J�շS
4����j�sU7j�J�!�����:}-����R`�ڛa:�&���S�]��}<c�~�&px��!�b��		P�&�� jf�c?p��f�A���yMs�VT��\Q�ť@S$_�5��R�^�r	���	��a7�(�E���J�>��&`�� J��O�l� S,�����{S $��1�@���K�ڋ�����h�.�u��Q�G��z�.��=�A��\��P�w�3m2��3mJ�p����^�|�88,!���p��lUR�\�R5IJ��s����R�T�,���Lkއ�g/��Y��,�Xs8�v��J�����
`2��g�Qל�P1J�O�dq8�*s�ԣ����oO�]i5�hu��K������i�y��s�Q���0��G�x;n�՗ժ2b.֮�N��xLvm��:J�t:�@�>	RE��hCS��/q3>mw�%-w�dA~�]�2�(����4�/MK[�O�!z����~X�8Œ��l�t])T��A��s�!�*��XJ Us�;�]���_��g�L��R
4}7�\}��tI	�f�	�kѤ�PA)J ��O�=cw�Z�jsu\�K��������e���S.��J�ZR�$��j.��-GnƔ\[����hz;���6#GwJ����	>:�_W�
�Q
4��o-�4��S=%�*�X�>�g����W	 �z�sP�ӫd,J�4���aM��:(�z!f����6�R�O,������U�ͫ��]�@��8�i��(w
�AZO5�Oۈ�[���e.J`������W�����\ۣh��d�84G��(�S���1[Hqz�*z.P4�^q�d��e��)�R��1l7?���ڣ�޺�V��@S<�7;oآ��^M)Ԯ>{:�l֝�� �}��V�����)���_��"W�5%�t��[ܜS�I�|V-��B��~а~WE�>J =� ����z�@%3p���9U��(������-�Q�jW�H"�@�_5,8E��:S?%��%�A�$Km�w	�v�����0�c�Չ[.����q7O�%M/�t�B�<1:X�M�T������:����]O�0�A*�k�>J��ؾ�W����-�@��g�0�/���W�1J���̳�	oU�4v�:0֥@S�P�w�I2%�H��������r#%@���n�����N�D;����q�ׇ��&�*�O	�n�����wܖ֨e�>S�j]
4�6�~��.y l����Yf.�ax�����>/��R���� ��Z�j�.�@S������D���V�ZG��O����Lo��}�O˭�q3��_�׊��]o���w�Z��+u��K��_�W�Kpd��8,��2<����a�����T�:W�?J vH���oR-��UĎX�rb��V�D�~#y��M��T�i,	�:��%p���u������nJ��C{}�F�0�}��p�s0qk�M���-�MQ���t������n^�p (��4����W�d��ji�X�l�Y2���Jӡ�9[����Ug��@]����tzJR��K���?�����=�Y�	'�%��g��C�:����kх�R���Z�ؤ�B�L��,x������Ǫ��K�����v�M�~��c��yݴ|m���X��3����M�z�\��S�����6N�)��7��A�]��~JI�S	O�%p���9���vs*$�ψ���ۖ����\V�M�>�'�%H�H�q	�|��՗�؃&6*����|l
�|�ՊY���-�7�<�~�M�ryY�MQ�x�їM�:s	$����9�����߁j�])�eH�����pzN]�MX�B�Q��q~�����ܪK���ҹڑ����oϫ�O��.ʳB}��Te8�t|�3�>�����O��+5��Țŭ�YT����hjm���	��E�08'�n�n8��OC|��$�'�����&>&Zd^�\���W��a���zu�?�R��>�R�~s�{���iW�!S�%V�k��B۸�[�niE�*��r.��%��R�*u�K��yR�ӥԉe�k嵺h���p~�r���ڦ�q�޸��h���,> ��V��.�.�J��p�=ى�S%*�U��8|��ԕ5��O����X����v��c�X�u)Д��|r{+rm~Xȏ	R�)Q_�g0���%��e���F�RW�ɶK����B�/��d��`��;n2jes��S
4e�$&1��!�����s�%���xܔ�b���!���Td�zt���V7(2�Ib:Ք(S����#0d�RȚ�.�Ӱ�;��9Y���wb�ڥ��՟��Z?�[��P.���k��q��qK7A�e�E	`-z� ����EV�K�i�.�y[P�R�]&�o��(i���p>�zj��+V8n���7�p�: ����G)�*��Ҋ�RR�)k�����J�<bؠh�ݝ���ԫ�H�#Z��	Ôb_e�l<�5@
4���<=8��f,��)�ԓ�xA�E�j�%��+�|L���y�.ˠO�g�ө�g\&�vafƵ*�T���T1M4��.٢{��H T=���˫�[�L�$uN��,S�%�P��0�ؚVE;ʬVD)����6iN'�D]�E�K�ba�.m�nR�)���㼉�qB&U���E��+��G/h{v(m�P�)��v2
� u`�K !�|?l��Ze�,�^})��*~�i��m�W��CM�)������e�TV� #���l3�]�Ț�Ku��@÷�YeĲ�3���R�)G���Y0�s�(��@��tIt)\�K�:��J��P�Cj��E.�ӯ��Ir�?ub���V�)����x�3*@]}��+�@��q�娿)�2%�20Dr�S�����Li]�a�R�boC=|H�T���DW��&P��UP��r[�Qϱ/dS�h�71	j��@����id�6�A9 1�S��l�%MQ�.����[l�J��Ty&6�hz��<��%@*��%����j�U��]\��Ó�H���+n��P%��qIZ_Q)�,J����λXu9e�z_J�Ծ�}��a��<κ�#G�#Ly�����ѣSCVU�\
4�!@��M�.��䈮� 1�T�*��R��N�|�P�"a�4o�����Ny�U#�d�Y,��{$�UP�X�z��1�N�VU��k�M�x�Mk�&h�r"(�6�;�y�0�'��U��X��v? '�U�jda�W)��[|�D��U�gJ�x��B�    �Mo磨���%`P�-���"ՙ*�⒑��UlYܧSk	����@C�g<oGS�B$��N�+��]m	��<S�ۓ��z��<uQ(ߛR��6F��z$�QJ�̱��Ӏd�*��G	��σ��r��ש)�9�*�L)��{����;n�F��ږ�xK��)5� �J Y�f��e�K��֕*������ö����r�09�wad�S������(��un��^�@�b�wLT��u#���M�v̏:�Q�~��R��׸}J^L�j������fX*A�Uv%���t�(�䀘�
���|�<*��(Ui�%�x6ᄹv-\ʺϔ@)�Mq⮓�OJ5�%�]nޚ�a7��[=\�X�C�Hb��dj�K��_��DPcZ���%`��{������K��G)�t�,�E�F��4��8u)Д�91�S�"W�J@1�p��t��>�R�R�R��m=\cJv���-w�a���Ll70�N5sJ��v{���(A�:+�%�r���4�TK�5�P���n_�6uQH�JH�����9�鞊�4��J}q�M�����*�B)��������[VH����[c��Ky��K��6�/nS�p��S��R�)��o�wCR��P�^�K���<v��Zuw��5�R�)>��)qb�c�"[M׊�h.����C�2��9I�9�K�d���q�e8���
�����K�0���;�k*V+�-p	4�[��I�d�>\����a��_�"��Y�"u�Mop*��$Yy����j��>�i>��S3�6�U��h��n|���.��u�3;QR�n�B�tP
4�0�i8��]{H�T�� �F��0=<3שSӌ�TP�ٳ�;y��TA)�������L�U�$��nƐM`��jհ�ԑ�.���֑��J6]�uD�*��yPS��P醔@�>�n#w�tje���C@
4E�xc�6�)U���m
��C)���^��>ue�*x�Ѱ�s8��V���]�*��Z_Y簷�qH�Km[)o�@�j���Q�%W)�5��|}�r�&�^B'�?(�6�of:G�B�m'W@(�b�Un�/̅K\�*]�p��O�˷~H����< QNu�=�#a��ܽ�a���Qq	�n)�:��|l]&�� �mPۧ!�8D��P�ټ���,�vY�r�)��s��ԇF�O:�]��~J���y�nV+��`��= ��ty���@S���d��(�R8%��y���7_�L�TY� �,v���^��̕�I)�����0�{�iB])3Q(�b��U��U����86���Kܫͮ��E�M�b1�}�X�s��K�dA	LT��¦�Ե�y$$p
rl�y��0�B��(���z��b�`5��8�Z�S��j�:9�����7^z*A�2��9�o����ڜ��_��u*JJ	����Ԗ�G�q�(2�@Sk_Gڗ��7]��x��=C��n��^(O�R�)���}U��&�V��d��1�)��l�@򓙿`����I�U�@S�����'Xr�*%��S�%R�\���Xl�(�ċ��^���P
4Eiu���,�Lks���.GvĽ��k�_Y���z�_z��e���M��}���+x��4�V�DJF,y���x�is��1�4�W͞p����{?��RM|(��4ld�$0���(S.����UMO� ���p�'I�&dL$�@�_Ξ��Z��R�Y���Ncj,�B�h�@B��k����ZS(��<=�&�����LW�M�O|ȕ���R��@SԍC%�^6�V�.R
4���6���(���y��Qϋ;X�M?m9�>s���_�j���z5Q�h�����ɯ��FU�Q��z���@I��p(��$�^,�7YV���R�)��q8ĭ���A7L3S�b\������}�ع�dy!�H�M�M�(��mz�Xc0#u~�K��H���*2�k�*�ƸY�8 �n���R�)���.	R�6� *��ո��'Ye!�&.��T��05s�_�m�.���ġ/�fc�)�9R�a����e���-��D��̋e=�M}?��X`R�B�G.��DQe�5O�s�x�|��so_��M��ϰ�W��Z�Ҥ4G�)�R1'#ﱀ�I])"�.�T�ō=�1yM��\�Z�%9��EZG�Y�v��v)Дԉ���^��NI 5����R^X�Ub��%��%%��1IRE0]�w�.�~��"�]^��R�)/�$9�DY��+�26��ȎoV�}��/
UD��;��(��\��s	�9��v��C�8r��C%�\��3y���}�?_���.�z	��k� ��
�"�\��ݼZ�~dU-":.�ԼV�a��BTP��.�@4'gg<��.�l�Œ���bV�R��z���&o�n*�M�b���X����"]
4�����$�Usg� B����ϼ�j?��A)�����T�^��K��6��P9���@W��.��g5�$GU'r	���yhH6hT�LH��8�x�5�^$rۯ��S
4�}e��JI�B�,S��@ӥz�wXb��*q)Д��;s�׋���sA"�M���׉�t5O��x�Ec��Źk,nG?�XM�˓�1J��؋<&)��)�R�Q�Ӏc�_��/L|�E)�*�2�x������\�y]����I¤�B	�%]��.8���?M�Y�		�ΗἾ�&8��&�@S�ֿ����$�.E��B�e�ow��n���Ur�K !\���tG�ӌ8��CF���S5ئ�_6�@STBKRZU��%P��"��R(���%��՟6��)�d�L�5j��-t�l'�Mo�
tF��^��t)�ԓ���7�0u��K��Ku��b�TS���g(3��^�-���r�K`�<�w|� m�)��n\
4�A~F\�*� 檘�K .A��OA���y��B�3�-��FT���h��q��k��Џ������tS���Z�Bo��	ʰ�> �@ӛc�1&Ajm�%�f��͝�S�U�b�K�ZVTyz/#?�o��+�V� H��_�n?ܧ�c-�H� R����oH�X��@~���C��7� OB�B��ǘ�J˦R %P���h3r$���tj�E)��v<��1��G�����d�M�n!�J��p	(4p���Y���[R��m�F�~Q_�~\��/�@ӿW�O��.��������U��|��@*C|��`��ԫ�=\��[lq̟�T�Z�s	�j��q��v�R��]V�GR�f���J�:���R��\-n�_��&�y�Z/%0�團��~�r5+Y�ҥ@ӹnt
ӫ�8%`�eb�\��f� �ʰ	�n@��"�U�
ڸh:o�I`J���0ˆ�:N���c]�բǫ�?r�oVU�zhJ����p�:)���O�z��N����\ż(�rr���_��qBwB
4�þ��{�#�����DJ
4�<L/��b�-ʥ@�[�Q�1ɑ�H�/�tO�[���6�v\%����q�O����<M��*V��;�Fj�j;�L
4e�˲��Wܩ#�\
4}����]��a��V?J��QYcO��;r�a�,d�R�)n�����1�Sa��W���hzkn��|Q�ԙ:�ǥ@���x[�͔�K��Mo{�c�gj�����l�ux������:���@ӷ�qkm���4��S�����l8ΝSWU�S\��I����&ժP	�����U� p)Д��F>nѾQ�O==H���ﯰ^��)T�b��byh/����J��@拿9��OT��%�P�e.pn��l�����[d�s����ožm*���Ձ?�t��)�kr��R�`�"k�?�r�NH�����Juz�H'�R���.c%0m�R (S���^cdJ%`�D:l�IN�*��n�`��|�]�����pN�~����(���mS��ʻ�d�.�U�������>0qU�M=�烷 ��UgG	�bF�vt�Uģ�s5����g#�i�\Ku����w]�;�q���P�~��4������Ϳ��_�Ҋ�׿�r��9^v���_�����4����{�`9xU�Ǐ�g忋�_]^ t   ����ϧ���?���*D���=4��8����w�4CSeh ��Zdq.s��Ns�3s+SK+S#=#S3\�\��i�
�0����b�4Cc=Cx0c�s��qqq �ܬ      �      x���Ksܸ�����Ϋv���N��~�[��7�c6(UE����q��ɓI�}��do:�:�'�D"Y����𜕡i����/E�K�ޕ�:�	��hC�)�K��S�JY�ep$P���p8^6�q��[G���H�˘�w����9y�NnÑ����f��é�XV�$�Pf_Ni5�=L,{��L�ݯ�����>��ɚ���]_�~W)�K����<P�פ�T��~����{w����{I�ar�MK2�TT��x�{&�F���zG�ɤe������jSW=�3��
r�r��뵋j��<i���<��4�\P�0U	�2����eJ�+2����d_��pr�d��7�)M�~�n)4��IP��1�6��3�lh�P���4�w�ؓ�S	�.{8^dh��Ўu_GGP�d�/��,f�i\�wO)����^l�H��J ��auDRJ�K�r	��^��ގ��\)/cQb(�ߎ_�^�ڲ����������Q��"w�(�k�x�&�Au�2$�b�k�lŒ�]P�y@]��&5��l�(N�"�ʨ\��`zL/[�g��֓�V��������Xmɼ���w�^�i<H��\v���"V�R��b|�^&��=VY��1�$,1���eL~����z*�1>���jjև*�'10w������a�(XgA��!����%�m[��mB���!���u�-v��*	��6��⤮�)U	�`&��n�y�^~��:y}6��ǐ��ܘJBi���6�۔�c]%`��Oä���BQ��P���/��c����M�G �z��t���㰎�� �/�~�y�c�:�ǯ�`B1O�O2���������*�e_��+g���@X�.���վY����@;^��9�I(�j�,/�
��!�H �}��o8��S�N/:$��ś��"	�-��]o�Tा�i�	� ��Uֳg�S��M�l��i��^m��<y��mI��$����it)Mu�H.(f$�~�y���2%cA��'�����Ć�|=	��}뿗��@mss��H �𥯣ߠ���[,�pz�}�=����\��7u_<LU���D�����o�����UU��(�"���"&ۣ�]`Hy������g��[�ޅ���"�z�t�*�t�n.�fE0e��i�L�.�H�L%��w�1���Y���WI@U�=���bd�O�G%`*�0<��;��t�M� �%�~{�v�x�dd�N�;\u�Am]���Pk~�<�/r�����椽H��i���w��S�(u�û��萚N�@
��4m.j�8�l:�$� ����%�<Jn:�$�Ff��𒼧�4�fxi���Q���SB��J�ȣ�ky��F�  ������,co��	�F��x�x(z6�N�}|�ƻ�/�a�K�����P�=�m�����i\�߈X��"��PǞ�r���q�I��w�0jq��]ڹ��$��J�4��0�n=P�X�L̴g��{W��_$��8��&��\�,��Z������ ��H����/��EY������s�����K�� �@j�G�����`c��� �"����&S?,��2%��oX�\/�5m�>��o�I0��}���asΑi�q �S�Q���a���6��;�J�ۚP��L4���a|�P�:P���jح�ߨ�nɛ�H����WR�+n�qA_0�(�^(��F_X�n��	�2{�u�:l�#��l��id,�C�b���*q[�X9x����`T	 ,�����d��Y/�$��x~� )G�����"�Z���n�l\_��cWIp� q��f���=�EG,�NÆ�*悪J3 ei�������\/}8N�ob����?���8P	���n
���;hq`_�Ĭ�$��T۽�;�EY���I�Z��W2���xL[�UWѓ�%6�a���D�C嬾�$�`KÔe$��$`�k�Op1��(�^����'l�n�d��8���2�����MUΊ���E��>��X��	�mc�`đ�5�l��on�eqD�@�,�tqѵ��沒i���lR��>����Q�,(M��}:L���,֞Z[�X\s�V�q�*Td�3)�Kaa8�IղǦP1�m�L�z�X��$p:}w����{����TI��t:��;����$�t��ti�sĀ�;��N�����=P_�E�I ��y�&S��[Mʑ��+����T�f��	X5��J1�.<	3��g�!�K�/bX��+�}�6E�U�����Jۤ����ʺ�쩩�륏�p���'��X�p�#�}�~��pm� ���>�4���on; &Tْ���Q&n�#�Vul�V	�F��z:��nj�2	�&���)c��v���nI��$�Z[>�+ a\{��r\�Ϟ���	Ǆ�J����V��U12��(���at9mQ�� 	��}dD}�9-{OT�CW����oxד��I���p����ea3��T�ɾ솽�<Nٶdd��e|�v�g!�ӑ�j��Ҥ�7�ũb�W%��b��6]���A�d�R%��yA�8�u��a��ԂEX(�{:�)EE��	(�1�d�,�ު���6�_⠺"�S��[��]p�t�'��w�pX��(#ϑ��|�=�9��IPmm�J2Ea:�&v��,*��d���.�a��J����_G��(I�yr*��k�sJ����mUE]]��%냬�a�ֱb�	�6�2�I_^��	�L'�&s��\Nj�,�����R����Hm��HM�6maK������@��u��I$��T��R$󞎃b�O���;�WN_�b�u�����y��䠪`E%�bv���zSPC�K�$&�����Įd7	�����?��vЬx����b��*,��W,�(�/
Q	l��OMܳ�4F%Pԫ�!�/��c�lj��ݮ��^%5��TT]�˫a��>�]kU�F����^����1��!���� ��5y�o�SUZShW��yx�0�[aR	�:��<L���5�'1	,q��q:K~��d�`B1�<����ۻ�S:N��2��dm��sB|�c���̠
Hȓ��p׾T�t��7�$�d�J������z��oR��ed�t��.�K&��,Y4դ\/}HSz=LU�I�$`z$�hj�f0;��j�xP)G��*g��u@mCV	&�e��[���쮪"��DCڹw%?$&��&1'S�1E ��7��Ki"�3M'�G#^m�^^��d�Ϥ�*�����˔��ʍ'�'�nO�\BX�5�"��LV�{!Wq5��!�u !u�@jl�a�Ħx�В2�U-GI�v�v�$�P�{��z�<�}\;��v�U���%���B�=�HT;���x��x7&	ϛ$,��?�xzJҪ����jP��_SZs��f7�T�)�Χ9���TM�um�R����@��J`�#�]L���"�#��1��<��H��ٻ4��v���Z��E\�����&�%ƍ̜*��f�1�  \�
2)�Km
����Y�$$�ȍ�����q�Q�%��=C�@Ė�x���JME�/���Ţ&�&	f>�;�F$o:1r*T-'�&���X�K4	,$��5Q���{J�J�h�����ّ�MH|�o�~�'$��$�t�H��l�S�\k��	ٓ,������_o��U)�K����N.�-<	���O�t�HK�4	�~�%���f��z�����z�
� �ř瘶�ΓJ ���wOǗ���V,5K*����UW�q:v{*��@��:x=޶I�5I8eiYn�}�IN3	�����j�� ���I�FА�}�]F�֘*��-�קa5N�v�ϦΊ��y���:^]ێ4	��Ǟ�?���ʓ;T	,,X�/�r���V�*��2���к�`�JB���e�8Ωn�_$p������5=sMTH����s9�%�1&��3]���w�+�Xh��Xp]�Wl�ul?ڤ\/�K�Li;�];�h`}��h9܆���g�$�0;bWV�6�8�/Y��I���_B� ��I��F �ߒۤ�e��JB'�ܝ�A�,/��[�@���y݊��%udS�$�    jc��8�x�X2��P8;�_�`�yNTTpp-��$8q5���þ��؉W� ��E�qT]����T�,�/6�8��1	 �p\��mOِ��$`zYm����˩��g�p�����<���$�R����=FSP$P���̝����BK$A����e|Y�w�շ�*��uG�w�n�y�Irv�lb2 T�����e���H���.�e�\��F�pLݐȸI� b��i"�9H�tKpf�9/,�d�3)G��b��i��ں&�J%������FD��:� lH2"��bk�]�x	7{��.��.U+��?�H��T���À���륪m�;ep�K�vn�ڞdG�N���t�ӝ��Ù=;�k�H�ܥ����� ���`��'Ӏ���G���TI��ɚsK�R�P�I��2�'騴sA=qL(d?yA�Ե$9�$��P�&R8�>�5�I u?����� c�&�rYӸ�ZՔ,�n@��<K�#�*j�:\���y��vX�0嬖,"M�]h��Z�qw�pMA|*���`�.�LO��j,A��9J�U�Q	(d~���w�{smEv<L�F�X�)��lARW[���!�G���	�8��K�9��'��&֣��5M��P�$�g���y\�i�]��ĳ�Ͳ0	88�(<����U�W�kf�Uʫ�J�}�N�QRW�H%��0��j\{��%�<� ������1y�X���L'~��tN���vz,�,�X�	�{�6�� �W���&�z��\���T%s�U��Q8�(�i��lCN�z����9u$�F�@�FJڮ0��(yk�|���,l��Y�$�j0���<�s`��:ŋX#����;�Zr�$�z�@l8x}ՒX*��4h5J��ZzN�$�PDk�æ��j�5�`�U\�-Ev>�$P��9&�FR��$`l��<��7G��@�$��������BI]�BR%�����tW���I��ْ�m5��ۄ��
����g�})E��bIr{M��9D��UVI s���e��]P���EI�HL��R;�vX�9�@�ɛV��[�^+m8��F�T�8��{`Gc�ֹ��ċ"v]%���4�@���c�.�%�M���jBY���j�sl�9"���6iU2��d��$��������dQT��&�����iOST��L�+qk�w:Cf��&�]���������g�P���#8��#��&~�9����&H��xl�N�U	+�$���2���N,#9Ln�K��uˆ�*�wlPZ���i:���$;-&��#4�8�Kl��	�$a�5��o0���H�� �m�ՀF͙f'��'�f��N�I�1=;�l0ݏ����`�L�&	�����A��7�V�I�2	�V�q@5���l��$�P�Y�euV[Þ����ū)�K�[��Ky(P �-�lq����,��$!!�,m��(�gG�LF�i�IW��N�
f�èQjő��ؾe��tW�K i�U���}Zuɲ�$A�%�%�=��.M������k�
%�"�TX�ħ�K�$��$��줯,�H��&	�+��V���-�5��DN_5��s����1	�Nϋ8�b����@z�`Q���섎I� ��&��"�hdQ��F�\/��p�"������&7o��Ҏ����0ah�<���]�Y��PD�j;�:VS�$�dh���Dch��#4)�K߯��	p(=��T�_��~Â���5�����JYmN��<JM��J������^���!�$��2��\�"ً1	 ��&�4ғ�i� �?��e7h���ڊ��*��Gm�B®'�QlP���Uk%m����ψ����Sd�ݤ\/}��/�pJ:O����f��D]3	�o7grP]��Jj̔��i�vQ �U�	���&�!ᔞ��N�~�@��wuI@A��P��̃�H�O�B���[8����k/�@겏��Ε��(�̜8���淣���ZJ��Y���Є<�@��R�`������H��s���a����d���`6|J�5�9��d�J���o)=On���`H�D]��R�r��!YT&	G�>s6���,��X�����E|9N�bb�U\_�8y��i�F��ٲ4o��İ���~/B"gU��Y�C��·bb��<Ҹ	�־�<Lߐh�I����~<͵"��9J�Q)�Zq6?�7>JY�ծJ�T�ķYF��8�:�*�&�f��,���d�$I��9��z8��~�փ7�6��F%!U��#MY��$��%����N��1MK:�$�ԅ��-���BIj��
_m5ϊ�dv�=�M
Ƿ8��ұ��&��Y�v��ӗd6)G:��_*夲d�*L	e8kW��e���o;+&	G���\i��ʆF�r����M}@���BA�U��C%�P�qwvQ1J&���9���9�%��N��r�n��sA�:�����^S8�+� WI0Z����h�%Iv5	�e��^���>~˩�}�R�_��"���J��V�fR������륟�+=y�`�"�$`��%aW�s�tn8m�8n�������H�T���;cc88���۞��u&	G���˰W;N1]C<1�����U���q$p:q�V��1eI�&	�_"k���?���G3	4��ԏIT-��	u�*���i�7��l��J;��|F�t���X�*y5�`�7G1���$�tv9Hsv>��w�	�*��J8�ei�&��ؔ���o���b����XS����"5*�~�i�9TZ	Ĥ\/}��)1���$2c8s������ͼ*	�Z>��ֶ8+Vl�S	�z�
,򂰫�iz8h�~�Fz�}�́u,�a`�~�{r{��FW%��(/�^k �{�̜J�bܔt1�9��/8V&���:)���&�8ċ������ C���2	�f�G���۟��pB���{r)�dl�$�Q�	&n瑺�ĞL��ަ�����H��B B?����R,r��$P�[0wO�4z�K��a���J|(�>�{�`0ҎX�}:���0�	��w��V;Z����6[�$[dE1�䡫��?> ��}�ܰ�d=���6R3P�j<��!'��T�2	�(��tJz��O�Ĉm��
c��rDz�3}9�l���IB�n���a��*<X�>�d`��Y�AD�J���k,r�b�CX�"U��7��y�@5%�N6	(LN��=$|x�A�@2��%�bWc/����X�t�'�ѣ�O�
��/�/9�d�j���#��7Hy��/�_˩X�� n[[�̏�\���'ֱ�N%�Z��%!8���Q������srŤ��|�~r9���I�h�����=Pd%�L�>*���(�ԳyJ%�:t�As 9�+�ԩ�p�"ӺY�=2��HU	��U��1a�����1*���ۦ��,x�0� �Y��hK�XQT�r|g�ߺϯoX�{��	s��K��2�J*�d�iO�n��]���Pf�)�K�Y�M.�gcA%��3�����|Xc ��,/{�Fͅ�ߨ6���J��W9�c<�#�lT��~�P*cĢ`_t3	;�Ҙ�l'�$[��T�z�n-�ߐo��T5<k�z��&&�$�~�ЂS�����:?�$�َ��=f�L�QƊ��[���D�i�M��K��6�(���N�I �1�-�V��Oz˒���$�Gl�$�p8{8�`�>����f��g}����d�X�Q5� ���?�R8�����$�N�~epP���W	�*��M.��Ib�Iਧ��qS��Զ$6nX�X����p���$p�x�c�ԗd;�$�Z|gZ�ѽ�>0�@8s�A}G9,wѤ\/���GT��l*�B�~��TV�ψ/��%΢I �(����,�b+!�@
f��6�q;ajH��r4��'5�k&�u!�ʿ��N�'�Ė�O��Am����A��M�e9hZ��ae�LL9�����SU���*�ϲ �ڻFAeK6�M�������%�К�V�$�J|x�Ok�ի�Hv�L
GE��O��9�kyޞ�� G  �_ƽ}�����I �8�ќ:�$��$ՅV(�O���$1	�����;��E-l޾�)Z6!�f����b���
��Q�������̣C�X�M�@k��Z��f)�iX�B(f72�D`�2	�ֶ����ئ�I -_n��=��qri���I��٧a�����IS0I0�菇;L��!߭�M�J������B��+��P	 5w�wx����ʦc��L��R��e�^��C��R�I@u������&v}ϖZ*�z��I�
E��m����b�P\��X4IpP6b\.�jIZ�I�`��,�P��A�,_�$A��x�Mö5;KC`��MF�h|0��7{�Cd9/&�z)�~��bZ�@RI0]iMB
���� �����ϟ�uHeA*������P<eK��_�pWVoB���Q���<���q���~C��&t��*��y�Bb鰹�
0���o	�	���������
���׼)�7U��+ɏ����x��_�^�Yd�/?ϣ~�v�a�������}�?v]��󼕫�Ӹ�~�xW�oB�&T���g?ϻ�����.[�#�Rx�Ҵ�~]�0�y�_��<�?��QZ      �     x�u�Mn�0��p�ٵ]`yc��JQ�9@68�U��ަۜ���4���Y�Ϗ$�����r��oMW��75������k�� `�H�GH	�W�d�,9�
Y!���!)�,�̏�l��b�M��l�܎.�O���/+�KaK�'[�K���8�ebT�0��_����#�(��HC��f���������;<ԃ�������}�eH���H)�f��Eˏ���^�X]��K�k'n�����ա$��He������D��t�      �   �  x���ϊ�0���SziR4�lɾ���5x� {
؆B�������E��^�/�M'v�.�JO3�����IΞ���V-)�ֺ�^8ҷ�4���¶�D�C�����u�I34$x�\γ^҈A�p& �y��|:]]�@I"�S% �=��C|����=�#{�-�#�S��K��W���x��y�"Ŕ��"�q`J%��a䯌C�u�������[�R-%��N�-M[�U�1��w�3.���P=�4�ڳ��?�J� )�M����#N�kGU�A�Ї�a�Wݧ���w���x\u7ݗf\���_���}}q�f�A`����M�Y��q>�}�BB@fdq� ~�Wq��LBPNo�tD��ɝ��b��v5�\�.
b���[Q�c�D��k���a��R2�@*���-i�⢇�nm�	n�!���,>��n�x�,Z�l�%��AYh�rur����y���6�{���8S�h���I�w�d�Q`<R�����W�'      �   V  x����nI��{��`�����q �b�6��:a� c�s����c�.��*aKtu�oNש*�W��(&l��F�D�}���^KH&��Mn�$���)L�(#�i�J�� $m�}JFs��З�DF�rX���k&�V�y�"�cL^J��z^,�M1�)ƹ<ƅ��U<�Ե�,A����rY|�L�з����uSpf���X;��Ŝ}���ږ� �Njh�B3wm@��,�w&�j��J`�'��$��6#q�- b��"�Ϟ��a�� g�2�nX�r�!N!�&i���#J6�2���M��5��!�&�W�5��a�.��\m����	��g���2�3�I�w��6��ۃ����vjru`�`k�Ʉ�H��h���!yv=!��h�O��Ǽ/p�ҋ�f�~�TB�L��Y��������6���Y1�� T'�0Z�B�~�k���C>��,l�),v�:Wl6!���;j��}�p�g���T�m6�Y�E^`�K��a�yk�<��d�"��e8ײ9���X,���r�]oV����4AMٍ6���s��C�4GB�лid!-RS$A)���w�Y僧^41	����x�&$�ۋD��}F6S>�wkK����g��R��V�\���26�ͩ��23�2#�I�*'ߜ�k-�n�nc@�{��ѧ���c>�8�����Ѩ7x��F�L�q�\����g�n@q`�k7e��i�/��
1�frN��C��z���[��ŢљL0���b�	q�	�{�H:<��H~~��!�j@Aߩ7_��ή'�(f��#e�B9��z���R��?����=d�K:ʒt��V��4$�<��H�u�ثn:�y�:�����%��=�c:��L�L�*	儺4ĕ?��H8���X�&?�e����).��L6���ys`3��탺b`
���zs�sv=Q�}�b:�Ưj�,�Q¼�͇�u������b2�y�1��k�ɔL9�a?��=����Di�[��v8�?B��1'����
��9C�}�Q��(���J��1	�����W�����D�O��m��e��W(�~6�qJ59M��9��|I�$�Kza`      �   F  x�}U͎�0>;O1��Z�'q���-׽x[��O��
q���ܐ8l+b���^y��n�d)R�&��3��|3	H���}����w?�?t__�t?�uw�,��o������`�b�E�>{L�`�&��dIvf���h�d �L^Dyb 7��L^�JWpfM�δ�*5l�� ��;�9�M޿��yєy���#}�>��B��`�q�n0������d�����!܋�����l7�f�nJSBV�jץ��3��}z�^�l�SX!OH�:39�tvfY䷌�+�Y�o1�c<���6D(�,���*A��!�"�<9Ҷ����⍝��
�+��r���﷼\p@j"��P��W	�s�qFr��
�ufS�S�?�-�Ǎ�q�2�};�q"%URMp��T����e�+le�7���E^ۼi7�u�/�M��U�6U��dج
?\���Y fj'�[��e��%V�%��e�B,�-{�VEY�^7�W����zq8�P��K{T��P�Q~L7p7|F�N�8ႆq�ag��t�f�k5	7�nq7^�4�~���Q4��h4�C*lw֮�hG�	�48�ogES���~��6Cc�U�p���s��_|w��;�� /�T�p�K\F���=�c����9Ɵ�2p��v�2�`�/�23�~�d�6� �
ۂR�]:M�v��fY�YX]��9E!9���c�����pƸ��p�Xx�$��,gv�"	"D�!�㒠D�9
{q��p��m���T2ޖ�Ɂ �I��������<�{<$�O���ɋgǏ���f�'؈a��m�x�Yݶ�Q���!�;����}���      �   �	  x���[�� E��Q��/p,=�q4��)�D�]ݹ���C(o��fH(���/��N�	���f��`�$'�!�w�-�&Z&���Z�y���JN��eg�9o� �Q�]7�!��'J����`����8`���[-����Sn'Jz�]����P(�-��TX�D������#'^G2��*���/�kW�M���:��uss�J\F�̮ԛ�^��\2!�#�]���n�[�Җc�1�����&n�|�xv=`��oN��'A�у�q��=�f<"CYF2���s���30��#�]on��N�DgE:Hg���ɮE�!Tv.[/�hM�n}n�����@5��-@kܔ��Z�E2�nV�%�:�TAR�m�n��a[A��VW	9eYb��kY�$mM
K���'�Ն�xO���X6��I�ug����<��u4�{
LOn���M��Je������v��_��B�z�~G8)kn��ٰ���)d���q�#1�!�1$���:RG8��-"���R]� aYF�"�.1�1�>$��-�^#u$���i��Y�e��Jκ�Б���!�����E\�a�R%��I�eXgyBkWP;�e46���03<CjǑI]<Ď$�ɫzI�]�\7ͅ�4�"u$f8f؇͓�8D��Ɗ>�������#Ia*�(;3��Cb]�NJ�����b��#b�׶��=�F������H���� R��� *ّ�ϗ��"�}��l�P1�#Ga~C�cHD�U�A�HB}����N�@.m\8�#O����-�{���c~i�Z#�-�:�U��4Ç������QI�,QC�n���dY�9�ðO���x� M�$ؘ'ú�6Цc��HI3��M�5�$���I3��!��'ixI3�<�0�#O�A�v���b��x��-��1vy3[����^#u$!B?�ǯ]�����K�-��H�p�p��U�5���$!�S�R7iKu����@���3|��+$����&�o��n�[CΛ֮Cq�#	����BJ�廔�nrH�����%���BʓB=��$ԭ䐛�J;�Q� �#1�kz]H"�u��$�Bw�|���� 6��O��:�fx��'��0����8�P��C�6�����-��H��=����4��I����p8,U��9��đ����Y
���)�e ~���!��zȑ�hS/u��e�	6�徍�F��03�BDJ\G�H�N۰���h��:�$�6�ׇ(J?*�E�"h;��kH����rS��n��$��=��;KYG���I�^���qmĺAAP]F�8��|��������6A�u�[�(?�)묭��+-�\�������&��.#Ȏ�03�BR�Y]4��I����Q{WdXG��a/1Ç�C2�L��YMڃ��(�S�b��&,�+�mL���!2)�C�"�~��%ľѪ������-�֣���C�_!2_���H&�o��׉�}[l��
�|��/~.���J����@�vw�.�
]K}���B�˨���p�I�ڨ��%q��x?���%�#u$!]��d��u��M!b�e�HB^�D{�`Ǚ�^rו@���ԑ��a�Zx��Pt$!]7�Ŏ3c���A��%�3�	#���A�HB�>;�-Z������[@�Hß��<��E�$�x�Pv��!kI�ȓ��d̓�xIHڿ�;Bj���G����gZz�4�k�g�b��$�$�:�j:��!�i˒�w�+ȑ4�>�1���:h9���=ú�[�ԡ���H��5�3��9�`�#�!h7��s���u�I3<_�^Bj����C�HB��hM�՞M������|�ȑ4��!I���$��4�4G�M��Q���{�7����3��1^���#	5��g(b[c������~�����hb�$!�%F��!��[��*�u����0=�H�2)�C�H�=�D�Hsh�������k$���������#	�%xʗI��b�,�4~GX�>d�b_b�#���u�vd+�=|���\�:�fxɰ�L�D犐�SzT#�'��k�r���	�%H�����H̐t|�gHd�I]<D�$�j���k�m�U���=�F�"���K�W �3΂�D�
�M4�(:�`/��3����}+X4w#�kĎ��0>�dd��uq:3n���������X!Sl'�,�H�o�9G^G�&	���l��?h�?C��b]"�uD����!�����Je��h��+������=��Jk��ϐ�&�:(GJ|�Pl܃T�gH\@��w�P�n�6�B���h^Gɑ4��-�	�t�hR�&	%=e��^���Wv�I3�g��(ˈ<I(�?S�!�f��"� ��qj9�ïO��x�HIh_җ!��-��^S����:�fx΅א�m{��#	u�Kb��xl\g0�u�(���!v1|�� GR�1E�U���z����V�N��r<b
�I�B�HB;/zȱ�H��K��9��-��_q�c      �      x��\�r�F�>KOQ���#,l��7Hbw3,QR�7t�H�6j@Ra���s��ƞ�ث���ᓬ�d3 Y 51�9�8:��L�TVf}�eV��<���唫#Bj���<��͐���t��$#�q>���i����S�%� ?�<�=����'L��)�P3%��<�&����IXn����L��0���o>C�?��g��cRML ���d�zJ��,^<�������sJ	���]��7����M�v?�\�VRM��Q�S&�j;����`%�=J�2y�,�$O>��/�Ű��5S����v��?<_�<�[:oM��c�-�u�x�>,���I6_�	I��$O���<C��������4_�Nr�.���)����a!8(�Bа���8�V�f��`���0cҿ<�..�w}�oo�2�=�#XF���Ҧy�b3i���Ťe1g�2g�E��I�>"�I� ��<�Wy�.�*'�7��}<�a×5[�z��&�\tW���ƤL
ia�$Ύ��Mt�s5$��1������q |e�\L#Lw�j���#�_���K���? �2���t��c�@����8Ktɲx��<j�D���1ٓ"FQ�����L�M�;E�ç���<��b������S����ە۞�����]%Z�.7p�q�u�~x6νm�;���s!@1�>�Rm�]��K̦�yc����h����6l\|�~�P{J�l�P^����n?�1q-�;������|5Mr�K���4l+�9����
�Q�Yg����
Ep>�r�l�H���)Η�$}*L�W��<_=�Eq��e��#�s~2���4�����a*C�ଫJ��\�*�d�U�Vqx�5��Q���ĥ5�
@|�Go��4��q4�q�B*#:���]�%p	hS���O�ґh1i�Lֿ>%y�� \������<�s� ��@��P�k1o�Q8/���2��U����@����ʂ�K+��?]ǐ63��v���8+��*��< ,sH>"�!��;���o\)�<�di
CSL�a^ֲU�9,&��ԁȻ�쁌���4���2B�
��̘�*�`g�]��`=l�A<��>*�h�{���M�}���@H@��e7�H����"�e�����`��`F��U51�E�c��Kӑ�Zі�?�O�g�ad�L>e�WP�ę#��x
���ޕN?��_?��~0
�����A4�6%U"�D��Z�ΪM~ܑ�2flÿ+s�Խ_`I�*��R�Lu��9�n�V��n��k��������m��Pk�l��?��ϰ�Ot�q�M�Xnv ���� ��]%�aoXq�,���4j�������ӫo���::�!�W�#r���"��-�=�F���{_����A8cR��\wW�זX�+t/��cT3���Ñp�P����Ye��gy$z$��@�+O�|9_-��t�C��߃4Ig���S�>�_ &�g�!L�����?nD�V��y�^�<T%[jH��!9�/Sab	�^x����뗏�IZqe2�g���l� �,`Y6��x�r؂G��L��'�ih(�� � P�qd!��m�"d�1�e���R�/�ﾽ���/�&B#۪g�!i���g��\���~C����Įi�!k�	�Y�4��J�T:\m�hl��VE�qf0�.�K��K�CU-V��
�V�������M�����]m�,&��~��~��\�v��I���<���a5y�mA���7�\��f�)�ܰ� 3�Dy�w�Fc#W��QQ��UjWbe��)�AWؖ�ޮ1�M졪A �)@�\�B�,,L�9x�d�U���-%+� 3Zo��&��
)�9�3p���e���<� �3�|���X��}���68A�V�@�/����!a?�?�/nVY
�ٗ$N�EJpM X����m䤬���"��V��y����e�[��-�V2�xg�w��G`g�ț���Wk���2�Ƣ�C�p����c:��Ge�o����v�AƢaTvU)��m�ـ���� [T�op�X?���4�s�I6i��������6ZwWy�)�Kx^0U�fhG;0)8�)�f	�,�=�e�s�z^�ъS�l ��2�O՞m�O���c��fZ��5I���,�	L{�Q�������hs�J�T��. ����Q��t0��>@��<~�?{_���h8zM΢���%�ч�T�5PL��zi�V�*ldqi���j˲3~,�Miy��X�/����l��%�I2K\����u�h0l�hY�U��}9Բ y�-�ɳ�ՖZ��C]eic�@LI6��L/�M�U�YA ��&��6�*av�h�L�&R�����uJC�?PǍ���O�^�.���,*������?��!:��""㫳A��E��Et�\�$E�5��Z	�]�"�e�Ra)`��/zPf�0�Z0n;�T�l8WI���B���x��~���r�<��P�D����x��P�Yh׶�5���ŃTZ6�yu��4���7+$�>��!�5�6�\���FS�A6W��d�0TG��1���N�����C��Ȣ�}�N��)l��٥���QqN�G����-���F���Y�Ŋ�MB���%eǚ���Nl#DP�,��	XV�����9����,u�7�LB�y�(�Lg���rV��N��]��F�\��i�B����>D֚]9pܧL��0F��e3�F�V�V;�Rv�%�W��RlG��h ^ځH�x[K�nGkK:&Y���g-A�~Xj�	I�����*cxr]�8������Ϩ?$�E_3ߞ���@Y�^��_s�G�c1*� u-�/�H=�OW��ss�~�ֿ.��5 ���^�H5BP*:�x�,+,4�+z��2���ϫ����ªe�I����t�`������˻,&�|����+�̖���+r�d)y$�����3b�^.�<z]�C5�&1GS��U$c	�D���[�߯ؿ�w>L<ɞ�?���{+D��4~r�=��$W�hX4����xΘ,�?>�2�<�_�%���m8���~6�4��
=�%�����]Cs}��7�2�Y��fq��[..��j�����׻W1�[SX���@�N�ўb�
�c2�?�@a�!45
�ny �j?~W[����e2#��$��W��I�p�2N����U��]��kDMnq!EW��c��ؕ��������X��I���N��$;H�l���&�z9�Fx�ա3�4fZ�J+2yD�3<�`R!V}LsmtwU�ؖ�j�������Cφ���9�9l��\M�MR]��ڨ�^�'���tV��A�Z����lhCՌ,X�c�j(�q�<�[i�;݃uV6��`�B�0w�JbyP���%�����Co,⛱s�T��@3e�Y�R���GAE�kP��%o������G�dOۛS�=��Ipw�KB�WL�dM�W��-mMy\a�a�n ��"q!�׹�!��Ua�-!P�*��O3w�Rg��K7�胻w��?���K��8#WO��@����_�b��B�����A�jr��(P�{�6q�i�6��T�=�іr��#����2�<��L��=�$bhiR�[K���U4e=Y�[���"E���5kxߖ�e-���"[�˯� �ZnC�Y�F9�:�(!�e����~-T׮S2�3�D���]�j�X��
�b,���*g
9^���ء�31o9+���Vu�&�X�_�~�q�f����ń ��Ӕ�]>��z�<w���S0��+f�	����z
��]�
R�D�g���`��? Æ���������"j�B7)]^U�ɰ��5�yE/B��f������^|@��Y��螡���:w �h�A�߁� f U�CB�]�jr�W�q7�
{0Kږ�8o�D}-g��Bz��HQgV�dJ�'tB�[b�	��2jG�IIu� �L.Z3�o�h0�E���US�A4�j�;�Ϫ��3JHYaVi���a�qi�UT�yq5��06I��������o\��lJ<���� (�e�UzG�ݩ�J�يhc+\� &  ÷��X4����x<�a�*g��cn���� ���n�A��\a�l���~����	Fll���5D�"T[������5ǯ�2,��jrB>w��4�)2H�TK갳��fy���g���^��w��;Șc�������rL�9{q9� o������_����_�w����kz0F����=pJˬ�g}�J�ȁ�2Uf�ET%��x��:��^�GE��N�Q��E�mї��K��[2�o�Cڳa4�wz.7��������Y��U�x-��)�U�U;5yXB�En#��N�>��}CH �J?��y�L�s�����!��N�(jZ�|Z�8�n�X���w��'��
ӒLߐy�O��?N��.{�0s�����8���	|&'����c�j
wK�L�{�U����n����Vٔ���2-�yv>@��6�n�pQ� �Z��ǃUy0������,R$Ik۽�%�=�t��[��[��c�5K�;�¸�J ���S�T�Y^��Ef Y3�g�?܂pu�|�6o��%��J�]%�:>�ҟw}��N{�~q����n��D�iPC2�̀a�����uP�ɕ;�g�"��e�W�u�>ܑ�9i?�/~F#�C�m�
)�j��
�ȝ3|q�f�O�T���v>#�ma��d�yu��"���s�;���rC��4�!g����iK��ܡ�+��9L��1��M��Zo���y׈|��3��x���"W�~$�y�)},�����*#�� ����H(-�V��e��A�w����K^0x�>�m�|���-�B��?�_�Yg�w�xB��*�����&�G�X2�U,��c'�a �~��Ճ'ؠX���/��@�2�1X� �x��UE��(� �H��2���x��9�����l���~S>�.q'����
��%����S�	:~��n�eyQ��9���W#��_^=�ߌ��}��_
&},K����|��p�Ļ$�B�*���U�Ynu�Qdc2�#�?]�v)��VjΩ��R�rU>#.EB(���?]����5�Z����}��j�Zz�.8>>�_B�:      �   �	  x��[�rܸ]�_��L��.|�N�ߖeE���+t"a�DHH��g�M~#�d�M��?�����"��l��U�4�/8;�nZ9�q���q��Yē_��Q=Mx��������ur�A�uKZ��S�o歅2�A�FF��(+�5�P9;jc-�����IP���Nw0@E ���I���=�؃��Ʌ���.]���svdEp�At�8�81Ժ%�"�'+;|AL��F f�+����3��`ǲ��D�������������[�`��Ӓ P Ύ���u�ߪ�XuM����#�{X>e�^3`˟����հ�9;n�p>DI��[���f�ڪ?F��O�礭�T-R�����jF2;�W�������V,!ʚi����������U
B���v�
��Ke��x��r�D�����j��!z=�Z��H��FǨ��v�>xM��0o�s���e�Ӹ�HQ���;��"�4��3�/���RIA��F�I?\�H<�JH��у�^�Ѡa^�Q1��D�KS7p�)<��ơ�LB$�)ɯ�+eQN�{B�@/�Vi�.���-����(F���>���\�M$Ғ�����Qyqx�Y���'��d
�2�pAfe`b��L�ē"b�鍅�YFT5�̠��^<����iT����P���L��QЂ(0�.��(1�9�B�3�<&i+�H�Vr���f緹��՘V���=���E/5Oٳ�zI(j5�=3iD���Mi����y��/�:9Q��B��l����}�ݭ���"f/��Q�b�c����
��/v3����='�W��1�ڬq������(U���ykͼEar�BןQ�)
|�>����rX���Ln$�me��M�|Z��kZX=�p|�!���}Ո>Q"*�������R��ri�8�LH< �(S�r���;�:��~q9{��	uY��zID�B�쥝���-��֨!��^���j�ka��S+�FkCx��N��D\����G�,YS�A!�w����X��t(��س�d�(7�#��:8�WJ��� ���33��(�cvk����`�^��� �^��C4�[�c$;���㔽C\&�3�:D<��f��`ʧ�O����_.T��oiĕG�c�~(�֊b:x\)(��Z��<a���&O�ٓ���0�p\�y��(�[q����:��y���{y���9��[5lণ��[m�R�v��ޚ;E� F~M��C��Hة�ka\��TM!y;���w��F3�hᅋ¯@Q
#�a��AE�j�Nj'�y��B4,�������qvĉ`���0�$^~��&`8!I	���Wp���@:ykz�� t�;O
Q�[8%�I�!�MT^.X�4~��ر��HSN�SPM����n�U�/%M���	�2y�I�1S��C�oA�A�+tҟߙ���� O���̬`��V�1!�@����-�Fc�d|3*k%��3OTkV�<�Qs�I�Ȉ������2v&{���x���h�γ���۵��NV�s��x��U��χt�Z���;� ����>�۠,)��L�����#�\F�`�䉗�C��R��y�g��♱צ���<g'��B��y,�6�MnS�a��+��%����_�A�W�}0��&��,'�. k)�Pc��k��@99���8I>w��auN^d�Sd8K/rv��V��-
v�gE��/��������l�|����B��5��(���	8�(���;"�L؅���W���ޚ���I}g�/(��0���˜]��	�`w�<a5.K�m=���%O�zX��j���h��S���ڏL�u�|��L�[2��RV� {�V��W′O�`�� s�}Sw��n�3�J�Wz�cw�l�b��1g��%,�?��#+�D����~o焵�po�W%;����`]��,�"��s.�Ȋ�H�,�f���6��{bx�>&v{B��TX�EL��C�#����@�h�h��k�[E>��5V��:�'b�tgn�.���F�"?D�dgzX�EL���]W����'�\���a������`������^��_�HTBp���r�I��q0v"81���T7���v�YVx�Bp�ӷ�[J[��7t���~�!8Q�N��a��B��+��K�yvz���� ����Bv)�ow�͊���:("%��> �"c�-�%��#D�.uold�P�	w��`�G�$���c9BT�@��ObvI
��y����,%����Kʋ/&DTgC������mnU|��C�0���� %�]G���$g���M$�xc��E�g�{m�4F�"`:!��#IE��F�^��h(���i)g�� �T���~9o��d��+989�DISv�uO9!̕4cWz�����<�ٟe����p��cE�3��(�_�td�Ӓ�e��xX�V�SȨ��b�I�K��C!���ɓ'�,��      �   �  x��TKn�0]���.��*���Sm`;�� ]t�(�M��\�.��5z��#7�I:J��I��ڨ��{��`ޛ�Aa�C]��zg��;�m���ףarB��)LiBe"HH#���)��TIB�bA^m�n+g�MW������nK3~A<H7��]-7g��X�l5j	"H�ֵ�<�Q���mJgvp�L���w5�:5���\cK��qeЯ�	'�l������7��Z���[s���������ݷQ�0�:(�5q�4*��S(ycVp�XM�O�S �I��P
&��R,}8�J�[Ӏe��������h}c:�v>)>�x.��s�^F�;E{`DY�~X�%���Ѽ�`�*S��G_w.m�n�� L��*"�0J�q?�(�y�R7���ϒR��V��r6�"q��VEv�ϲ�Ϯ��by��s<;Kg�|�_��t�_,��	%�Ġh"Y�9��J)%�pDe�`wx�ޞ.��f�V�L�l(%���UA��ۦ:%dS�H��(�H���}8�:8M��-9��6�0j)AΡ��Q�`ZA�E��^���y�g����l��3E'l�Lk�24�0��Ȧ��蒯������	a�t��P�>�����#����n��~vMA��C)	�|(%�����!���B-      �   I   x�3�LL����4202�50�52S04�24�2��37037�$^�����R��������giqj]������ ��.&      �   l  x�ŔIN�0���)r�Xo�dGA� Ċ�����M��s�b!�T�vC~��_���y@q=���nhB6٪�����Fq�2�s_�SK���h�͹  ��d3�
m��ЕĴ�Ů�R�5�����"<�}/��ۦ e�uΤ� �)��yX=��Њ�i\�!s�
��J��N�^��M/Φ�޷Ap��DH��٢��~�"���:���wJ��<\��eׄ^<�x3�97�q��ft��?�?�G �d]�\1Ÿ �ͱ�$��e�Pw���П ����PZY��Ү��"��R̆շ�	��ro;�]-O:�����|��~��c�B"�-�k8�u/����횚f�X�&�_��BmR��QR�W
[}�      �     x��XYo�H|�E�k�^ݶ߀��a	5���6���k#�d�7�&���HH�SBTש�Rb:�*�\�n+������lI��K$,��:��q����2O���K�ZD�p�(��~��s��*X��GH�������t@��!���&4 �D����I���(��l��Vn�Ʊ������	r�9D�`b����m�A�P����jz�~��u�:�I��_֩���O����4j&��4H��!�Q]%�8I�+�|�?�딩TY;���N�Chs�+[��KqX���e�u�U[D���|9����U�T��+���r�o��:��x6h��9�R~ �G*�����ڴ�-��l0��4�����Mb��Ƶ/@�U���l���wur��l���}�-7ix�ǎ��J�))%�� Z�8���_������c�^x��="|�n2PNu��|TWo�-'I�*�ҍ'ތ������A�4^��u���Rs&Z�2m;�qz����|lzL�o�
@��Ĥ ����ێ��J
]�䐾r'��8��yE�q}Wo���vk7��!�(����}�bWL���s�̤ CS���v+N� J6��O���*���B*�\ıwwD�b/�����hI��E�S��{��Y���A뵞�d=�F+���@��������A��)�s��[���vw�t���ڴ4x)��0pż=��Q�V�{v��O;��m�m�0O���
5)6��TĊ�]l���Y̽���axIt�@a�l�	Ku�l��t���S�߬��T�fq%��g����E�ˠ�2Ҕ�9m����w�l+��A`P��?��+n�)�k�_;D�ݚ�n�bH��T�)�Ep��]�>O����U߾l��2�Nx�2C��$��V��ɠ4�!�{Y|�^$y��xi4�:Q�! N��ú��̃y�����F0�R��JA�=`��[���rɻ��jh�'�ʙA.��\��I��h@7���"���'n�$V�ԅW��k��mjMF��H��r��j"&��m�Yo/I��N��:ov��ݩ�G�� ������ ���<-a�#�a�w��(��?
��7�q�r�Q�N�p�����h=�NhM�ܸ����v�n5��w�1}@���2b��C�U�+a������7��W.�gg;�|���X�Zv}甗��l#��_N�ӸY��V����/g����s���5�W�71i��αJ�B1"ܺ2�}�D�މ_Oq�4�Z���Y�GF��������89$�a���h��Y�o���]��G�
�2�I��͑ah_�>���r�0oe� ���͑���01T:$�{�'W$i�׻�\s�K/Y�յѸF6�v�c x�x��bgO�3�YW��������6�fƠ�a@�iD7>������@��V#�ᷫ�9ۡJti�Z��n�����b���l����M�~�o����wʚ���d:�t���!�Q]�F`N���V:��ik��Sז�}싥}th>�|]�j���Q�u&��w�6��N�ƛ܄H�G�!�4����_@U��Z=��      �   �  x�}��r�6���S��S<�&囝��l�n:���0�b3���l�t�8=5�}�XAIq��+��O �0Z�Uم�I.�Ww��B,�Y�(�v`0#�L������q;�SsRB�}�Cۇ3nj���#�+
����|��!�xn���K{��&�v��nF��[_�^��;�.�2vNJ+�:�^;�a�QrNJ�'O4�`�5Ŝ�9[ױ$�p�9QJi�%R{)��XXnRb8�v��.�N�+b!��]�b����X�N�+B�)� �������T5���ZcIr�¼����b�ǲ�]I���������+ hEg�[�V���3D
�$N�$@��O/U����T�X|/��Ƴ�"@p;�%���� ޲����bv�)�v��!50���.��bP�J�}���0
O�Q��붍e��U�������3��PF�UӄG��,Ԭ9)1 <���>��������ms:���
�6֠��&H�6׷��Fxc�z�QJ�٦g�����q���#=I�1ܲ��X�h�u�h��(�	��@TF5G�Q���y�C��<�p���3Iĳ�.�ܕ����J��÷Pp[�-��)a�.~�k�k���E�DF)1`.Y�]����|�uU��#��97)�
��ױ�J�:j��Sf���MG�^����h��@#�M��D(��pO� � �Fz<��@Fhj��qC����-��xy���B��j���J	q��/۶�k�:���k�,q���8�{�#\_���8�QJ'؆*�zN��IB1V��M��z�8��{T��K��EoS�;K+� j���c�C�<[,�ܚQ��3��%9[a����$%��o�@�x��`Nҙ��Qv�aSxͳ�Z���$%
��Є�%���p&�m��%&�I��!SWe��:���B<�')��\���Ĺ)�j�=q⣔HF�/M�u�;tVJ礁����%�}�^NR���S�]���m���/�1I	���
9D0�m&�?Jc�~�j�����I��LRAR�&7��'<J� `��.��Y�	��4jɋ��=�>�;�IvbW��t�4��%׭�����_�'Ȼ�A��m����L��Ǫ��?��^r����qG����[�|�0�9�����-t�*�u�?3����m$���;�����_�s�4��ȅ��^*�����'s'y�%�'<w%��D��"˲ xl�     