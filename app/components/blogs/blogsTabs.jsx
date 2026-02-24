"use client";

import React, { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { LanguageContext } from "@/app/context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/app/api/blog";

const BlogsTabs = () => {
  const { language, t } = useContext(LanguageContext);
  const [activeFilter, setActiveFilter] = useState("*");
  const [visibleCount, setVisibleCount] = useState(9);

  const { data: blogsList = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    refetchInterval: 5000, // 5 seconds polling for live updates
  });

  const filters = [
    { label: t("all_articles"), value: "*" },
    { label: t("branding_and_identity"), value: "Branding" },
    { label: t("web_design_label"), value: "Web_design" },
    { label: t("graphic_design_label"), value: "Graphic_design" },
    { label: t("digital_marketing_label"), value: "digital_marketing" },
    { label: t("e_commerce_label"), value: "e_commerce" },
  ];

  const filteredBlogs =
    activeFilter === "*"
      ? blogsList
      : blogsList.filter((blog) => blog.category === activeFilter);

  const currentBlogs = [...filteredBlogs].reverse().slice(0, visibleCount);

  const handleFilterClick = (e, filterValue) => {
    e.preventDefault();
    setActiveFilter(filterValue);
    setVisibleCount(9);
  };

  const handleShowMore = (e) => {
    e.preventDefault();
    setVisibleCount((prev) => prev + 9);
  };

  return (
    <div className="page-blog">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 margin-top-100">
            <div className="our-Project-nav">
              <ul>
                {filters.map((filter) => (
                  <li key={filter.value}>
                    <Link
                      href="#"
                      className={
                        activeFilter === filter.value ? "active-btn" : ""
                      }
                      onClick={(e) => handleFilterClick(e, filter.value)}
                    >
                      {filter.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="row">
          {isLoading ? (
            <div className="col-12 text-center mt-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">{t("loading_articles")}</p>
            </div>
          ) : (
            <>
              {(currentBlogs).map((blog) => (
                <div
                  key={blog.id}
                  className={`col-lg-4 col-md-6 ${blog.category}`}
                >
                  {/* <!-- Post Item Start --> */}
                  <div className="post-item">
                    {/* <!-- Post Featured Image Start--> */}
                    <div className="post-featured-image">
                      <figure>
                        <Link
                          href={
                            language === "ar"
                              ? `/blog/${blog.slug_ar}`
                              : `/blog/${blog.slug}`
                          }
                          className="image-anime"
                          data-cursor-text={t("read_article")}
                          style={{
                            display: "block",
                            position: "relative",
                            width: "100%",
                            height: "auto",
                          }}
                        >
                          {(() => {
                            const photo = blog.photos?.find(
                              (p) => p.is_arabic === (language === "ar")
                            );
                            const photoUrl = photo?.url || blog.photo_url;
                            if (!photoUrl || photoUrl === "") return null;
                            return (
                              <Image
                                src={photoUrl}
                                alt={
                                  photo?.alt ||
                                  (language === "ar"
                                    ? blog.image_alt_text_ar
                                    : blog.image_alt_text_en)
                                }
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{
                                  objectFit: "cover",
                                  width: "100%",
                                  height: "auto",
                                }}
                              />
                            );
                          })()}
                        </Link>
                      </figure>
                    </div>
                    {/* <!-- Post Featured Image End --> */}

                    {/* <!-- Post Item Body Start --> */}
                    <div className="post-item-body">
                      {/* <!-- Post Item Content Start --> */}
                      <div className="post-item-content">
                        <h3>
                          <Link
                            href={
                              language === "ar"
                                ? `/blog/${blog.slug_ar}`
                                : `/blog/${blog.slug}`
                            }
                          >
                            {language === "ar" ? blog.title_ar : blog.title_en}
                          </Link>
                        </h3>
                      </div>
                      {/* <!-- Post Item Content End --> */}

                      {/* <!-- Post Item Readmore Button Start--> */}
                      <div className="post-item-btn">
                        <Link
                          href={
                            language === "ar"
                              ? `/blog/${blog.slug_ar}`
                              : `/blog/${blog.slug}`
                          }
                        >
                          {language === "ar" ? "اقرأ المزيد" : "Read More"}
                        </Link>
                      </div>
                      {/* <!-- Post Item Readmore Button End--> */}
                    </div>
                    {/* <!-- Post Item Body End --> */}
                  </div>
                  {/* <!-- Post Item End --> */}
                </div>
              ))}

              {filteredBlogs.length === 0 && (
                <div className="col-12 text-center mt-5">
                  <p>{t("no_articles_found")}</p>
                </div>
              )}

              {visibleCount < filteredBlogs.length && (
                <div className="col-12 mt-5 mb-4 text-center">
                  <div className=" d-inline-block section-btn">
                    <Link
                      href="#"
                      onClick={handleShowMore}
                      className="btn-default"
                    >
                      {language === "ar" ? "عرض المزيد" : "Show More"}
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogsTabs;
