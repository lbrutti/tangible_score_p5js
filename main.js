function onOpenCVReady() {
    let src = cv.imread("canvasInput");
    const canvasOutput = document.querySelector("#canvasOutput");
    canvasOutput.width = src.size().width;
    canvasOutput.height = src.size().height;
    let dst = cv.Mat.zeros(src.cols, src.rows, cv.CV_8UC3);


    cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
    // cv.threshold(src, src, 120, 200, cv.THRESH_BINARY);
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    // You can try more different parameters
    cv.findContours(
        src,
        contours,
        hierarchy,
        cv.RETR_CCOMP,
        cv.CHAIN_APPROX_SIMPLE
    );
    // draw contours with random Scalar
    const points = {};
    for (let i = 0; i < contours.size(); ++i) {
        const ci = contours.get(i);
        let area = cv.contourArea(ci, false);
        if (area > 20) {
            let color = new cv.Scalar(
                Math.round(Math.random() * 255),
                Math.round(Math.random() * 255),
                Math.round(Math.random() * 255)
            );

            cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100);

            points[i] = [];
            for (let j = 0; j < ci.data32S.length; j += 2) {
                let p = {};
                p.x = ci.data32S[j];
                p.y = ci.data32S[j + 1];
                points[i].push(p);
            }

        }
    }

    cv.imshow("canvasOutput", dst);
    src.delete();
    dst.delete();

    contours.delete();
    hierarchy.delete();

}